import type { Request, Response } from "express";
import {
  createMemoSchema,
  memoIdParamsSchema,
  memoListQuerySchema,
} from "../schemas/memo-schemas";
import * as memosService from "../services/memos-service";

const INVALID_USER_MESSAGE = "존재하는 사용자의 userId가 필요합니다.";

export async function listMemos(req: Request, res: Response) {
  const query = memoListQuerySchema.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ message: "커서는 양의 정수여야 합니다." });
    return;
  }

  const page = await memosService.listMemos(query.data.cursor);
  res.json(page);
}

export async function getMemo(req: Request, res: Response) {
  const params = memoIdParamsSchema.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ message: "메모 ID는 양의 정수여야 합니다." });
    return;
  }

  const memo = await memosService.getMemo(params.data.id);
  if (!memo) {
    res.status(404).json({ message: "메모를 찾을 수 없습니다." });
    return;
  }

  res.json(memo);
}

export async function createMemo(req: Request, res: Response) {
  const body = createMemoSchema.safeParse(req.body ?? {});
  if (!body.success) {
    const hasInvalidUserId = body.error.issues.some(
      (issue) => issue.path[0] === "userId",
    );
    const message = hasInvalidUserId
      ? INVALID_USER_MESSAGE
      : "제목과 내용을 입력하세요. imageUrl은 문자열이어야 합니다.";
    res.status(400).json({ message });
    return;
  }

  const memo = await memosService.createMemo(body.data);
  if (!memo) {
    res.status(400).json({ message: INVALID_USER_MESSAGE });
    return;
  }

  res.location(`/memos/${memo.id}`).status(201).json(memo);
}
