"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedLayout = ({ children }: LayoutProps<"/">) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const loggedIn = Boolean(session);

  useEffect(() => {
    if (!isPending && !loggedIn) {
      router.replace("/login");
    }
  }, [isPending, loggedIn, router]);

  if (!loggedIn) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
