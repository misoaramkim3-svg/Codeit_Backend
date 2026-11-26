import { Router } from "express";
import {
  createComment,
  createMemo,
  deleteMemo,
  getMemo,
  listMemos,
} from "../controllers/memos-controller";
import { requireLogin } from "../middlewares/require-login";

export const memosRouter = Router();

// 메모 라우트에 들어가기 전에 로그인 세션을 확인한다.
memosRouter.use(requireLogin);

memosRouter.get("/", listMemos);
memosRouter.get("/:id", getMemo);
memosRouter.post("/", createMemo);
memosRouter.post("/:id/comments", createComment);
memosRouter.delete("/:id", deleteMemo);
