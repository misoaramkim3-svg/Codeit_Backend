import { z } from "zod";

export type UserType = {
  id: number;
  email: string;
  password: string;
  username: string;
  createdAt: string;
};

export type NewUserType = Omit<UserType, "id" | "createdAt">;
export type PublicUserType = Omit<UserType, "password">;
export type LoginResultType = { token: string };

export type MemoRecordType = {
  id: number;
  userId: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
};

// POST /memos가 실제로 받은 JSON을 검사하는 규칙이다.
export const createMemoSchema = z.object({
  userId: z.number().int().positive(),
  title: z.string().trim().min(1),
  content: z.string().refine((value) => value.trim().length > 0),
  imageUrl: z.string().default(""),
});

// 클라이언트가 보내기 전의 입력 타입이므로 imageUrl은 생략할 수 있다.
export type CreateMemoRequest = z.input<typeof createMemoSchema>;

// 메모 API의 createdAt은 UTC ISO 8601 문자열이다. 화면에서 표시할 시간대로 바꾼다.
export type MemoResponse = MemoRecordType & {
  username: string;
};

export type MemoPageType = {
  memos: MemoResponse[];
  nextCursor: number | null;
};

// 기존 프론트엔드 화면과 실습용 가짜 서버에서도 사용하는 이름이다.
export type MemoType = MemoResponse;
export type NewMemoType = Omit<MemoRecordType, "id" | "createdAt">;
