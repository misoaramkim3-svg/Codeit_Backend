"use client";

import { logoutApi } from "@/api/auth-api";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const ProfileComponent = () => {
  const router = useRouter();
  const { data: session, isPending: isLoading } = authClient.useSession();
  const me = session?.user;
  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => router.replace("/login"),
  });

  if (isLoading) {
    return <p className="text-ink-muted">내 정보를 불러오는 중...</p>;
  }

  if (!me) {
    return <p className="text-ink-muted">내 정보를 불러오지 못했어요.</p>;
  }

  return (
    <div className="form-panel">
      <h1 className="form-title">{me.name}님, 환영해요!</h1>
      <p className="text-ink-sub">오늘도 메모를 남겨 보세요.</p>
      <div className="form-actions">
        <button
          type="button"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="btn-secondary"
        >
          {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
        </button>
      </div>
      {logoutMutation.isError && (
        <p className="form-message" role="alert">
          {logoutMutation.error.message}
        </p>
      )}
    </div>
  );
};

export default ProfileComponent;
