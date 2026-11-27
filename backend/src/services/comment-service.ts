import { Prisma } from "../generated/prisma/client";
import { getNowString } from "../lib/date";
import { prisma } from "../lib/prisma";
import { CommentType, MemoType, NewCommentType } from "../types";

const commentInclude = {
  user: { select: { username: true } },
} satisfies Prisma.CommentInclude;

type CommentWithUserType = Prisma.CommentGetPayload<{
  include: typeof commentInclude;
}>;

const toCommentResponse = ({
  user,
  createdAt,
  ...comment
}: CommentWithUserType): CommentType => ({
  ...comment,
  createdAt: getNowString(createdAt),
  username: user.username,
});

export const getComments = async (memoId: number): Promise<CommentType[]> => {
  const comments = await prisma.comment.findMany({
    where: { memoId },
    orderBy: { id: "asc" },
    include: commentInclude,
  });

  return comments.map(toCommentResponse);
};

export const createComment = async (
  memo: Pick<MemoType, "id" | "userId" | "title">,
  userId: string,
  newComment: NewCommentType,
) => {
  // 댓글과 알림을 하나의 트랜잭션으로 묶는다. 먼저 댓글 ID를 얻고,
  // 그 ID로 알림을 저장한다. 한쪽이 실패하면 두 저장 모두 취소된다.
  return prisma.$transaction(async (tx) => {
    const comment = await tx.comment.create({
      data: { memoId: memo.id, userId, content: newComment.content },
      include: commentInclude,
    });

    // 댓글 작성자 이름으로 메시지를 만들고 메모 작성자를 받는 사람으로 저장한다.
    // isRead를 생략하면 DB 기본값인 false로 저장된다.
    const notification = await tx.notification.create({
      data: {
        recipientId: memo.userId,
        commentId: comment.id,
        message: `${comment.user.username}님이 "${memo.title}" 메모에 댓글을 달았어요.`,
      },
    });

    return { comment: toCommentResponse(comment), notification };
  });
};
