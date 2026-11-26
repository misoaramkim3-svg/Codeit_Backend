import type { z } from "zod";
import type {
  createCommentSchema,
  createMemoSchema,
} from "./schemas/memo-schemas";

export type UserType = {
  id: number;
  email: string;
  password: string;
  username: string;
  createdAt: string;
};

export type SignupRequest = Pick<UserType, "email" | "password" | "username">;
export type LoginRequest = SignupRequest;

export type MemoRecordType = {
  id: number;
  userId: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
};

// 클라이언트가 보내기 전의 입력 타입이므로 imageUrl은 생략할 수 있다.
export type CreateMemoRequest = z.input<typeof createMemoSchema>;

export type CreateCommentRequest = z.input<typeof createCommentSchema>;

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
