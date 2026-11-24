import { Router } from "express";
import {
  createMemo,
  getMemo,
  listMemos,
} from "../controllers/memos-controller";

export const memosRouter = Router();

memosRouter.get("/", listMemos);
memosRouter.get("/:id", getMemo);
memosRouter.post("/", createMemo);
