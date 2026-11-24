import { getMeApi } from "@/api/auth-api";
import type { PublicUserType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useMeQuery = (token: string | null) => {
  return useQuery<PublicUserType | null>({
    queryKey: ["me", token],
    queryFn: () => getMeApi(token as string),
    enabled: token !== null,
    retry: false,
  });
};
