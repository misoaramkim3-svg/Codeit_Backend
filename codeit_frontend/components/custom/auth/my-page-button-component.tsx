"use client";

import { authClient } from "@/lib/auth-client";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

const MyPageButtonComponent = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleClick = () => {
    if (session) {
      router.push("/mypage");
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="nav-link"
      aria-label="마이 페이지"
    >
      <CircleUserRound className="size-6" aria-hidden />
    </button>
  );
};

export default MyPageButtonComponent;
