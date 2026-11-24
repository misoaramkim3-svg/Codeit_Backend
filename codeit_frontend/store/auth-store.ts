import { isTokenValid } from "@/lib/token";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  token: string | null;
  saveToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      saveToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    { name: "auth" },
  ),
);

export const isLoggedIn = (state: AuthStore) => {
  return state.token !== null && isTokenValid(state.token);
};
