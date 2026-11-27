import { deleteMemoApi } from "@/api/memos-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMemoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMemoApi,
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: ["memos", id] });
      queryClient.resetQueries({ queryKey: ["memos"], exact: true });
    },
  });
};
