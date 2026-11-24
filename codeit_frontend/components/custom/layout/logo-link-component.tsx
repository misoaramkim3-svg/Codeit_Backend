"use client";

import { isLoggedIn, useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LogoLinkComponent = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }
    if (isLoggedIn(useAuthStore.getState())) {
      e.preventDefault();
      router.push("/memos");
    }
  };

  return (
    <Link href="/" onClick={handleClick} className="logo mr-auto">
      Memoit
    </Link>
  );
};

export default LogoLinkComponent;
