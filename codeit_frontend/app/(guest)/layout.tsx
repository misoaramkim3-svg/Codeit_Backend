"use client";

import FooterComponent from "@/components/custom/layout/footer-component";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GuestLayout = ({ children }: LayoutProps<"/">) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const loggedIn = Boolean(session);

  useEffect(() => {
    if (loggedIn) {
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
