"use client";

import { isLoggedIn, useAuthStore } from "@/store/auth-store";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

const MyPageButtonComponent = () => {
  const router = useRouter();

  const handleClick = () => {
    if (isLoggedIn(useAuthStore.getState())) {
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
