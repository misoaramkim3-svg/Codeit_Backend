import { signUpApi } from "@/api/auth-api";
import { useMutation } from "@tanstack/react-query";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUpApi,
  });
};
