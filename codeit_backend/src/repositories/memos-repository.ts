import { prisma } from "../db/prisma";
import type { Prisma } from "../generated/prisma/client";
import type { NewMemoType } from "../types";

const authorSelection = { author: { select: { name: true } } } as const;

export type MemoWithAuthor = Prisma.MemoGetPayload<{
  include: typeof authorSelection;
}>;

// PostgreSQL의 Int 열이 받을 수 있는 최대 ID다.
const MAX_MEMO_ID = 2_147_483_647;

export function findMemos(limit: number, cursor?: number) {
  // 다음 페이지는 직전 페이지의 마지막 ID보다 작은 메모부터 조회한다.
  const where =
    cursor !== undefined && cursor <= MAX_MEMO_ID ? { id: { lt: cursor } } : {};

  return prisma.memo.findMany({
    where,
    orderBy: { id: "desc" },
    take: limit,
    include: authorSelection,
  });
}

export async function findMemoById(id: number) {
  if (id > MAX_MEMO_ID) {
    return null;
  }

  return prisma.memo.findUnique({
    where: { id },
    include: authorSelection,
  });
}

export function findUserById(id: string) {
  return prisma.betterAuthUser.findUnique({
    where: { id },
    select: { id: true },
  });
}

export function insertMemo(input: NewMemoType) {
  return prisma.memo.create({
    data: input,
    include: authorSelection,
  });
}

export async function deleteMemoById(id: number): Promise<number> {
  if (id > MAX_MEMO_ID) {
    return 0;
  }

  // 기본 키로 한 건을 삭제하고, 이미 지워진 메모는 삭제 건수가 0이다.
  const { count } = await prisma.memo.deleteMany({ where: { id } });
  return count;
}
