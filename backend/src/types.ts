export type MemoRecordType = {
  id: number;
  userId: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
};

export type MemoType = MemoRecordType & {
  username: string;
};

export type NewMemoType = Omit<MemoRecordType, "id" | "userId" | "createdAt">;

export type MemoPageType = {
  memos: MemoType[];
  nextCursor: number | null;
};

export type CommentRecordType = {
  id: number;
  memoId: number;
  userId: string;
  content: string;
  createdAt: string;
};

export type CommentType = CommentRecordType & {
  username: string;
};

export type NewCommentType = Pick<CommentRecordType, "content">;

export type ErrorResultType = {
  message: string;
};
