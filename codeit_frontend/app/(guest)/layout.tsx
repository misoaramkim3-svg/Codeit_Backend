"use client";

import FooterComponent from "@/components/custom/layout/footer-component";
import { isLoggedIn, useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GuestLayout = ({ children }: LayoutProps<"/">) => {
  const router = useRouter();
  const loggedIn = useAuthStore(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn(useAuthStore.getState())) {
      router.replace("/memos");
    }
  }, [loggedIn, router]);

  if (loggedIn) {
    return null;
  }

  return (
    <>
      <div className="content-fill">{children}</div>
      <FooterComponent />
    </>
  );
};

export default GuestLayout;
