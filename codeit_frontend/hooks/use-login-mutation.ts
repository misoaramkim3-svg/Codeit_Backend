import { loginApi } from "@/api/auth-api";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};
