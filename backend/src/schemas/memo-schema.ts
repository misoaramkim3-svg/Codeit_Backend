import { z } from "zod";

const MAX_TITLE_LENGTH = 30;
const MAX_CONTENT_LENGTH = 1000;

export const memoPageQuerySchema = z.object({
  cursor: z.coerce
    .number({ error: "cursor는 1 이상의 정수여야 해요." })
    .int()
    .positive()
    .optional(),
});

export const memoParamsSchema = z.object({
  id: z.coerce
    .number({ error: "id는 1 이상의 정수여야 해요." })
    .int()
    .positive(),
});

export const newMemoSchema = z.object(
  {
    title: z
      .string({ error: "제목을 문자열로 보내 주세요." })
      .max(
        MAX_TITLE_LENGTH,
        `제목은 ${MAX_TITLE_LENGTH}자 이하로 입력해 주세요.`,
      ),
    content: z
      .string({ error: "내용을 문자열로 보내 주세요." })
      .max(
        MAX_CONTENT_LENGTH,
        `내용은 ${MAX_CONTENT_LENGTH}자 이하로 입력해 주세요.`,
      ),
    imageUrl: z.string({ error: "imageUrl을 문자열로 보내 주세요." }),
  },
  { error: "메모 정보를 JSON 객체로 보내 주세요." },
);
