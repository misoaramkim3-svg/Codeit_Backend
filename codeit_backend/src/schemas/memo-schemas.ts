import { z } from "zod";

// URL에서 받은 숫자 문자열을 양의 정수로 바꾼다.
const positiveIntegerFromString = z
  .string()
  .regex(/^\d+$/)
  .transform(Number)
  .pipe(z.number().int().positive());

export const memoListQuerySchema = z.object({
  cursor: positiveIntegerFromString.optional(),
});

export const memoIdParamsSchema = z.object({
  id: positiveIntegerFromString,
});

export const createMemoSchema = z.object({
  userId: z.string().min(1),
  title: z.string().trim().min(1),
  content: z.string().refine((value) => value.trim().length > 0),
  imageUrl: z.string().default(""),
});
