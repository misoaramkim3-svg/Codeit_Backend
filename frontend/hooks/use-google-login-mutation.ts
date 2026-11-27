import { googleLoginApi } from "@/api/auth-api";
import { useMutation } from "@tanstack/react-query";

export const useGoogleLoginMutation = () => {
  return useMutation({
    mutationFn: googleLoginApi,
  });
};
