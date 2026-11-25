import axios from "axios";
import type {
  CreateMemoRequest,
  MemoPageType,
  MemoResponse,
  MemoType,
} from "@/types";

// 1단계. 브라우저는 Axios로 프론트 서버(3000번)의 /api/memos에 요청한다.
// 5단계. Axios의 data에는 서버가 보낸 JSON 응답이 들어 있다.
export const loadMemosApi = async (cursor: number | null = null) => {
  const { data } = await axios.get<MemoPageType>("/api/memos", {
    params: { cursor },
  });
  return data;
};

export const loadMemoApi = async (id: number) => {
  try {
    const { data } = await axios.get<MemoType>(`/api/memos/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const createMemoApi = async (
  request: CreateMemoRequest,
): Promise<MemoResponse> => {
  // 서버가 응답한 메모의 id를 작성 화면에서 상세 페이지로 이동할 때 사용한다.
  const { data } = await axios.post<MemoResponse>("/api/memos", request);
  return data;
};

export const deleteMemoApi = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/api/memos/${id}`);
  } catch (error) {
    // 이미 지워진 메모도 화면에서는 삭제 완료로 처리한다.
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return;
    }
    throw error;
  }
};
