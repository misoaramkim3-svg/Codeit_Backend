import { loadMemoApi } from "@/api/memos-api";
import type { MemoType } from "@backend/types";
import { useQuery } from "@tanstack/react-query";

export const useMemoQuery = (id: number) => {
  return useQuery<MemoType | null>({
    queryKey: ["memos", id],
    queryFn: () => loadMemoApi(id),
  });
};
