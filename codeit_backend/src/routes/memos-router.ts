import { Router } from "express";
import {
  createMemo,
  deleteMemo,
  getMemo,
  listMemos,
} from "../controllers/memos-controller";

export const memosRouter = Router();

memosRouter.get("/", listMemos);
memosRouter.get("/:id", getMemo);
memosRouter.post("/", createMemo);
memosRouter.delete("/:id", deleteMemo);
