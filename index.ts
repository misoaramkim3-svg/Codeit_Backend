import express from "express";
import { FAKE_MEMOS, FAKE_USERS } from "./fake-database";
import type { MemoRecordType } from "./types";

const app = express();
const port = 3000;
let nextMemoId =
  FAKE_MEMOS.reduce((max, memo) => Math.max(max, memo.id), 0) + 1;

app.get("/", (req, res) => {
  res.send("Hello fdsfssfsfd");
});

app.get("/memos", (_req, res) => {
  res.json(FAKE_MEMOS);
});

app.post("/memos", express.json(), (req, res) => {
  const { userId, title, content, imageUrl = "" } = req.body ?? {};

  if (!FAKE_USERS.some((user) => user.id === userId)) {
    res.status(400).json({ message: "존재하는 사용자의 userId가 필요합니다." });
    return;
  }

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof content !== "string" ||
    !content.trim() ||
    typeof imageUrl !== "string"
  ) {
    res.status(400).json({
      message: "제목과 내용을 입력하세요. imageUrl은 문자열이어야 합니다.",
    });
    return;
  }

  const memo: MemoRecordType = {
    id: nextMemoId++,
    userId,
    title: title.trim(),
    content,
    imageUrl,
    createdAt: new Date().toISOString(),
  };

  FAKE_MEMOS.unshift(memo);
  res.location(`/memos/${memo.id}`).status(201).json(memo);
});

app.get("/memos/:id", (req, res) => {
  const rawId = req.params.id;
  const id = Number(rawId);

  if (!/^\d+$/.test(rawId) || !Number.isSafeInteger(id) || id < 1) {
    res.status(400).json({ message: "메모 ID는 양의 정수여야 합니다." });
    return;
  }

  const memo = FAKE_MEMOS.find((record) => record.id === id);

  if (!memo) {
    res.status(404).json({ message: "메모를 찾을 수 없습니다." });
    return;
  }

  res.json(memo);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
