import { Prisma } from "../generated/prisma/client";
import { getNowString } from "../lib/date";
import { prisma } from "../lib/prisma";
import { MemoPageType, MemoType, NewMemoType } from "../types";

const memoInclude = {
  user: { select: { username: true } },
} satisfies Prisma.MemoInclude;

type MemoWithUserType = Prisma.MemoGetPayload<{ include: typeof memoInclude }>;

const toMemoResponse = ({
  user,
  createdAt,
  ...memo
}: MemoWithUserType): MemoType => ({
  ...memo,
  createdAt: getNowString(createdAt),
  username: user.username,
});

const MEMO_PAGE_LIMIT = 15;

export const getMemoPage = async (
  cursor: number | null,
): Promise<MemoPageType> => {
  const memos = await prisma.memo.findMany({
    where: cursor === null ? {} : { id: { lt: cursor } },
    orderBy: { id: "desc" },
    take: MEMO_PAGE_LIMIT + 1,
    include: memoInclude,
  });

  const pageMemos = memos.slice(0, MEMO_PAGE_LIMIT);
  const hasNext = memos.length > MEMO_PAGE_LIMIT;

  return {
    memos: pageMemos.map(toMemoResponse),
    nextCursor: hasNext ? pageMemos[pageMemos.length - 1].id : null,
  };
};

export const getMemo = async (id: number): Promise<MemoType | null> => {
  const memo = await prisma.memo.findUnique({
    where: { id },
    include: memoInclude,
  });

  return memo ? toMemoResponse(memo) : null;
};

export const createMemo = async (
  userId: string,
  newMemo: NewMemoType,
): Promise<MemoType> => {
  const { title, content, imageUrl } = newMemo;

  const memo = await prisma.memo.create({
    data: { userId, title, content, imageUrl },
    include: memoInclude,
  });

  return toMemoResponse(memo);
};

export const deleteMemo = async (id: number): Promise<void> => {
  await prisma.memo.delete({ where: { id } });
};
