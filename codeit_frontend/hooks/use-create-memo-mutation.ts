import { createMemoApi } from "@/api/memos-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memoListQueryKey } from "./use-memos-query";

export const useCreateMemoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMemoApi,
    onSuccess: () => {
      return queryClient.resetQueries({ queryKey: memoListQueryKey });
    },
  });
};
