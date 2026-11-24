"use client";

import { isLoggedIn, useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedLayout = ({ children }: LayoutProps<"/">) => {
  const router = useRouter();
  const loggedIn = useAuthStore(isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn(useAuthStore.getState())) {
      router.replace("/");
    }
  }, [loggedIn, router]);

  if (!loggedIn) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
