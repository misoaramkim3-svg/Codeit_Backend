import { FAKE_COMMENTS, FAKE_MEMOS, FAKE_USERS } from "./fake-database";
import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.comment.deleteMany();
  await prisma.memo.deleteMany();
  await prisma.user.deleteMany();

  const userIds = new Map<number, string>();

  for (const fakeUser of FAKE_USERS) {
    const { user } = await auth.api.signUpEmail({
      body: {
        email: fakeUser.email,
        password: fakeUser.password,
        name: fakeUser.username,
      },
    });
    await prisma.user.update({
      where: { id: user.id },
      data: { createdAt: new Date(fakeUser.createdAt) },
    });
    userIds.set(fakeUser.id, user.id);
  }

  const memos = [...FAKE_MEMOS].sort((a, b) => a.id - b.id);

  const createdMemos = await prisma.memo.createManyAndReturn({
    data: memos.map((memo) => ({
      userId: userIds.get(memo.userId)!,
      title: memo.title,
      content: memo.content,
      imageUrl: memo.imageUrl,
      createdAt: new Date(memo.createdAt),
    })),
    select: { id: true },
  });

  const memoIds = new Map<number, number>();
  memos.forEach((memo, index) => {
    memoIds.set(memo.id, createdMemos[index].id);
  });

  await prisma.comment.createMany({
    data: FAKE_COMMENTS.map((comment) => ({
      memoId: memoIds.get(comment.memoId)!,
      userId: userIds.get(comment.userId)!,
      content: comment.content,
      createdAt: new Date(comment.createdAt),
    })),
  });

  console.log(
    `사용자 ${userIds.size}명, 메모 ${memos.length}개, 댓글 ${FAKE_COMMENTS.length}개를 넣었어요.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
