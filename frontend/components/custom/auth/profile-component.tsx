"use client";

import { useLogoutMutation } from "@/hooks/use-logout-mutation";
import { useMeQuery } from "@/hooks/use-me-query";

const ProfileComponent = () => {
  const { data: me, isLoading } = useMeQuery();
  const logoutMutation = useLogoutMutation();

  if (isLoading) {
    return <p className="text-ink-muted">내 정보를 불러오는 중...</p>;
  }

  if (!me) {
    return <p className="text-ink-muted">내 정보를 불러오지 못했어요.</p>;
  }

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="form-panel">
      <h1 className="form-title">{me.username}님, 환영해요!</h1>
      <p className="text-ink-sub">오늘도 메모를 남겨 보세요.</p>
      <div className="form-actions">
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="btn-secondary"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default ProfileComponent;
