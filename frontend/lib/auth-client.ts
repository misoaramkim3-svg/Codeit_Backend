import { API_URL } from "@/lib/api-client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: API_URL,
});
