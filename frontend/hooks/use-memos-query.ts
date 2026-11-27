import { loadMemosApi } from "@/api/memos-api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMemosQuery = () => {
  return useInfiniteQuery({
    queryKey: ["memos"],
    queryFn: ({ pageParam }) => loadMemosApi(pageParam),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
