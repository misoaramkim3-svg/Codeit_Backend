import express, { Response } from "express";
import { io } from "../lib/io";
import { LoginLocalsType, requireLogin } from "../middlewares/require-login";
import {
  memoPageQuerySchema,
  memoParamsSchema,
  newMemoSchema,
} from "../schemas/memo-schema";
import { newCommentSchema } from "../schemas/comment-schema";
import { createComment, getComments } from "../services/comment-service";
import {
  createMemo,
  deleteMemo,
  getMemo,
  getMemoPage,
} from "../services/memo-service";
import { CommentType, ErrorResultType, MemoPageType, MemoType } from "../types";

const memosRouter = express.Router();

memosRouter.use(requireLogin);

memosRouter.get(
  "/",
  async (req, res: Response<MemoPageType | ErrorResultType>) => {
    const result = memoPageQuerySchema.safeParse(req.query);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    res.json(await getMemoPage(result.data.cursor ?? null));
  },
);

memosRouter.get(
  "/:id",
  async (req, res: Response<MemoType | ErrorResultType>) => {
    const result = memoParamsSchema.safeParse(req.params);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const memo = await getMemo(result.data.id);
    if (!memo) {
      res.status(404).json({ message: "메모를 찾을 수 없어요." });
      return;
    }

    res.json(memo);
  },
);

memosRouter.get(
  "/:id/comments",
  async (req, res: Response<CommentType[] | ErrorResultType>) => {
    const result = memoParamsSchema.safeParse(req.params);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const memo = await getMemo(result.data.id);
    if (!memo) {
      res.status(404).json({ message: "메모를 찾을 수 없어요." });
      return;
    }

    res.json(await getComments(memo.id));
  },
);

memosRouter.post(
  "/:id/comments",
  async (
    req,
    res: Response<CommentType | ErrorResultType, LoginLocalsType>,
  ) => {
    const paramsResult = memoParamsSchema.safeParse(req.params);
    if (!paramsResult.success) {
      res.status(400).json({ message: paramsResult.error.issues[0].message });
      return;
    }

    const bodyResult = newCommentSchema.safeParse(req.body);
    if (!bodyResult.success) {
      res.status(400).json({ message: bodyResult.error.issues[0].message });
      return;
    }

    const memo = await getMemo(paramsResult.data.id);
    if (!memo) {
      res.status(404).json({ message: "메모를 찾을 수 없어요." });
      return;
    }

    // 서비스에서 댓글과 알림을 모두 저장한 뒤, API에는 기존처럼 댓글만 반환한다.
    const { comment, notification } = await createComment(
      memo,
      res.locals.user.id,
      bodyResult.data,
    );
    res.status(201).json(comment);

    // DB 커밋이 끝났으므로 저장한 메시지를 수신자의 Socket.IO 룸에 보낸다.
    io.to(notification.recipientId).emit("message", notification.message);
  },
);

memosRouter.post(
  "/",
  async (req, res: Response<MemoType | ErrorResultType, LoginLocalsType>) => {
    const result = newMemoSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    res.status(201).json(await createMemo(res.locals.user.id, result.data));
  },
);

memosRouter.delete(
  "/:id",
  async (req, res: Response<ErrorResultType, LoginLocalsType>) => {
    const result = memoParamsSchema.safeParse(req.params);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const memo = await getMemo(result.data.id);
    if (!memo) {
      res.status(404).json({ message: "메모를 찾을 수 없어요." });
      return;
    }

    if (memo.userId !== res.locals.user.id) {
      res.status(403).json({ message: "내가 쓴 메모만 지울 수 있어요." });
      return;
    }

    await deleteMemo(memo.id);
    res.status(204).end();
  },
);

export default memosRouter;
