import { apiClient } from "@/lib/api-client";
import type { MemoPageType, MemoType, NewMemoType } from "@backend/types";
import axios from "axios";

export const loadMemosApi = async (cursor: number | null = null) => {
  const response = await apiClient.get<MemoPageType>("/memos", {
    params: { cursor },
  });
  return response.data;
};

export const loadMemoApi = async (id: number) => {
  try {
    const response = await apiClient.get<MemoType>(`/memos/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const deleteMemoApi = async (id: number) => {
  await apiClient.delete(`/memos/${id}`);
};

export const createMemoApi = async (newMemo: NewMemoType) => {
  const response = await apiClient.post<MemoType>("/memos", newMemo);
  return response.data;
};
