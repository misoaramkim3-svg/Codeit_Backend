import express from "express";
import { FAKE_MEMOS, FAKE_USERS } from "../fake-database";
import {
  createMemoSchema,
  type MemoPageType,
  type MemoRecordType,
  type MemoResponse,
} from "../types";

export const memosRouter = express.Router();

const MEMOS_PER_PAGE = 15;
let nextMemoId =
  FAKE_MEMOS.reduce((largestId, memo) => Math.max(largestId, memo.id), 0) + 1;

function parsePositiveInteger(value: unknown): number | null {
  if (typeof value !== "string" || !/^\d+$/.test(value)) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    return null;
  }

  return parsed;
}

function toMemoResponse(memo: MemoRecordType): MemoResponse {
  const author = FAKE_USERS.find((user) => user.id === memo.userId);

  // 시간대 없는 실습 데이터는 한국 시각으로 기록된 값이다.
  const hasTimeZone = /(?:Z|[+-]\d{2}:\d{2})$/.test(memo.createdAt);
  const createdAtWithTimeZone = hasTimeZone
    ? memo.createdAt
    : `${memo.createdAt}+09:00`;

  return {
    ...memo,
    createdAt: new Date(createdAtWithTimeZone).toISOString(),
    username: author?.username ?? "알 수 없음",
  };
}

// 4단계. GET /memos 목록 조회
memosRouter.get("/", (req, res) => {
  // /memos?cursor=43의 43은 쿼리 문자열이므로 req.query에서 읽는다.
  const rawCursor = req.query.cursor;
  const cursor = parsePositiveInteger(rawCursor);

  if (rawCursor !== undefined && cursor === null) {
    res.status(400).json({ message: "커서는 양의 정수여야 합니다." });
    return;
  }

  // 메모는 최신 ID부터 정렬되어 있다. 다음 페이지에는 이전 마지막 ID보다 작은 메모만 담는다.
  const matchingMemos =
    cursor === null
      ? FAKE_MEMOS
      : FAKE_MEMOS.filter((memo) => memo.id < cursor);
  const pageMemos = matchingMemos.slice(0, MEMOS_PER_PAGE);
  const hasNextPage = matchingMemos.length > MEMOS_PER_PAGE;
  const nextCursor = hasNextPage ? pageMemos[pageMemos.length - 1].id : null;

  const page: MemoPageType = {
    memos: pageMemos.map(toMemoResponse),
    nextCursor,
  };

  // 5단계. 이번 페이지의 메모와 다음 요청에 사용할 커서를 JSON으로 보낸다.
  res.json(page);
});

// 4단계. POST /memos 생성. index.ts의 JSON 미들웨어가 채운 req.body를 읽는다.
memosRouter.post("/", (req, res) => {
  const result = createMemoSchema.safeParse(req.body ?? {});

  if (!result.success) {
    const hasInvalidUserId = result.error.issues.some(
      (issue) => issue.path[0] === "userId",
    );
    const message = hasInvalidUserId
      ? "존재하는 사용자의 userId가 필요합니다."
      : "제목과 내용을 입력하세요. imageUrl은 문자열이어야 합니다.";
    res.status(400).json({ message });
    return;
  }

  // Zod로 값의 형식을 확인한 뒤, 등록된 사용자인지 데이터에서 확인한다.
  const { userId } = result.data;
  if (!FAKE_USERS.some((user) => user.id === userId)) {
    res.status(400).json({ message: "존재하는 사용자의 userId가 필요합니다." });
    return;
  }

  // 메모 ID와 생성 시각은 서버에서 정한다.
  const memo: MemoRecordType = {
    id: nextMemoId,
    ...result.data,
    createdAt: new Date().toISOString(),
  };

  // 메모리 배열 맨 앞에 저장해 목록 조회 시 가장 먼저 나오게 한다.
  FAKE_MEMOS.unshift(memo);
  nextMemoId += 1;

  // 5단계. 생성된 메모와 상세 주소를 201 응답으로 보낸다.
  res.location(`/memos/${memo.id}`).status(201).json(toMemoResponse(memo));
});

// 4단계. GET /memos/:id 상세 조회
memosRouter.get("/:id", (req, res) => {
  // /memos/100의 100은 경로의 일부이므로 req.params에서 읽는다.
  const memoId = parsePositiveInteger(req.params.id);

  if (memoId === null) {
    res.status(400).json({ message: "메모 ID는 양의 정수여야 합니다." });
    return;
  }

  const memo = FAKE_MEMOS.find((record) => record.id === memoId);

  if (!memo) {
    res.status(404).json({ message: "메모를 찾을 수 없습니다." });
    return;
  }

  // 5단계. 메모 한 개에 작성자 이름을 붙여 JSON으로 보낸다.
  res.json(toMemoResponse(memo));
});
