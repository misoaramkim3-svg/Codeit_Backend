import { apiClient } from "@/lib/api-client";
import type { CommentType, NewCommentType } from "@backend/types";

export const loadCommentsApi = async (memoId: number) => {
  const response = await apiClient.get<CommentType[]>(
    `/memos/${memoId}/comments`,
  );
  return response.data;
};

export const createCommentApi = async (
  memoId: number,
  newComment: NewCommentType,
) => {
  const response = await apiClient.post<CommentType>(
    `/memos/${memoId}/comments`,
    newComment,
  );
  return response.data;
};
