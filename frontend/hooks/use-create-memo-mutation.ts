import { createMemoApi } from "@/api/memos-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateMemoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMemoApi,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["memos"], exact: true });
    },
  });
};
