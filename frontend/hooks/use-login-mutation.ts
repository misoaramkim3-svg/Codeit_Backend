import { loginApi } from "@/api/auth-api";
import { ME_QUERY_KEY } from "@/hooks/use-me-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(ME_QUERY_KEY, user);
    },
  });
};
