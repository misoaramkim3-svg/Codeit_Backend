import { z } from "zod";

const MAX_CONTENT_LENGTH = 300;

export const newCommentSchema = z.object(
  {
    content: z
      .string({ error: "댓글을 문자열로 보내 주세요." })
      .trim()
      .min(1, "댓글을 입력해 주세요.")
      .max(
        MAX_CONTENT_LENGTH,
        `댓글은 ${MAX_CONTENT_LENGTH}자 이하로 입력해 주세요.`,
      ),
  },
  { error: "댓글 정보를 JSON 객체로 보내 주세요." },
);
