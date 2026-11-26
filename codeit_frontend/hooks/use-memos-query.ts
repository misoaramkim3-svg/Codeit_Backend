import { loadMemosApi } from "@/api/memos-api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const memoListQueryKey = ["memos", "list"] as const;

export const useMemosQuery = (authorName: string) => {
  return useInfiniteQuery({
    queryKey: [...memoListQueryKey, authorName],
    queryFn: ({ pageParam, signal }) =>
      loadMemosApi(pageParam, authorName, signal),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
