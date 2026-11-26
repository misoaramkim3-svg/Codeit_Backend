import { deleteMemoApi } from "@/api/memos-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memoListQueryKey } from "./use-memos-query";

export const useDeleteMemoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMemoApi,
    onSuccess: async (_, id) => {
      const detailQuery = { queryKey: ["memos", id], exact: true };
      await queryClient.cancelQueries(detailQuery);
      queryClient.setQueryData(detailQuery.queryKey, null);
      await queryClient.resetQueries({ queryKey: memoListQueryKey });
    },
  });
};
