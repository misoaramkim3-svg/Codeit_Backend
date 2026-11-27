import { loadCommentsApi } from "@/api/comments-api";
import { useQuery } from "@tanstack/react-query";

export const useCommentsQuery = (memoId: number) => {
  return useQuery({
    queryKey: ["memos", memoId, "comments"],
    queryFn: () => loadCommentsApi(memoId),
  });
};
