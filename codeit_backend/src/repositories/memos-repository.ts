import { prisma } from "../db/prisma";
import type { Prisma } from "../generated/prisma/client";
import type { NewMemoType } from "../types";

const authorSelection = { author: { select: { username: true } } } as const;

export type MemoWithAuthor = Prisma.MemoGetPayload<{
  include: typeof authorSelection;
}>;

// PostgreSQL의 Int 열이 받을 수 있는 최대 ID다.
const MAX_MEMO_ID = 2_147_483_647;

export function findMemos(limit: number, cursor?: number) {
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

export async function findUserById(id: number) {
  if (id > MAX_MEMO_ID) {
    return null;
  }

  return prisma.user.findUnique({
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
