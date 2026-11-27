"use client";

import { useMeQuery } from "@/hooks/use-me-query";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

const MyPageButtonComponent = () => {
  const router = useRouter();
  const { data: me } = useMeQuery();

  const handleClick = () => {
    if (me) {
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
