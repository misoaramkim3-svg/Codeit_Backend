import * as memosRepository from "../repositories/memos-repository";
import type { MemoWithAuthor } from "../repositories/memos-repository";
import type { MemoPageType, MemoResponse, NewMemoType } from "../types";

const MEMOS_PER_PAGE = 15;

export async function getMemoPage(cursor?: number): Promise<MemoPageType> {
  // 한 건을 더 읽어서 다음 페이지가 있는지 확인한다.
  const fetchedMemos = await memosRepository.findMemos(
    MEMOS_PER_PAGE + 1,
    cursor,
  );
  const pageMemos = fetchedMemos.slice(0, MEMOS_PER_PAGE);
  const hasNextPage = fetchedMemos.length > MEMOS_PER_PAGE;
  const nextCursor = hasNextPage ? pageMemos[pageMemos.length - 1].id : null;

  return {
    memos: pageMemos.map(toMemoResponse),
    nextCursor,
  };
}

export async function getMemo(id: number): Promise<MemoResponse | undefined> {
  const memo = await memosRepository.findMemoById(id);
  return memo ? toMemoResponse(memo) : undefined;
}

export async function createMemo(
  input: NewMemoType,
): Promise<MemoResponse | undefined> {
  // 요청 형식이 올바르더라도 등록되지 않은 사용자는 메모를 작성할 수 없다.
  const user = await memosRepository.findUserById(input.userId);
  if (!user) {
    return undefined;
  }

  const memo = await memosRepository.insertMemo(input);
  return toMemoResponse(memo);
}

function toMemoResponse(memo: MemoWithAuthor): MemoResponse {
  const { author, createdAt, ...fields } = memo;
  return {
    ...fields,
    createdAt: createdAt.toISOString(),
    username: author.name,
  };
}

export async function deleteMemo(id: number): Promise<boolean> {
  const deletedCount = await memosRepository.deleteMemoById(id);
  return deletedCount > 0;
}
