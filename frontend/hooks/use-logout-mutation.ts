import { logoutApi } from "@/api/auth-api";
import { ME_QUERY_KEY } from "@/hooks/use-me-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.setQueryData(ME_QUERY_KEY, null);
    },
  });
};
