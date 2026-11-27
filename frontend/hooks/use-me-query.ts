import { getMeApi } from "@/api/auth-api";
import { useQuery } from "@tanstack/react-query";

export const ME_QUERY_KEY = ["me"];

export const useMeQuery = () => {
  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: getMeApi,
    retry: false,
  });
};
