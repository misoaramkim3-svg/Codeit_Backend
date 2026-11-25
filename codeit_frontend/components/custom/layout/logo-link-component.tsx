"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LogoLinkComponent = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }
    if (session) {
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
