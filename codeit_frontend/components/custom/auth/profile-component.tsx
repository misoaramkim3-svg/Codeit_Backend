"use client";

import { useMeQuery } from "@/hooks/use-me-query";
import { AppError } from "@/lib/app-error";
import { isLoggedIn, useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const isUnauthorizedError = (error: unknown): error is AppError => {
  return error instanceof AppError && error.type === "UNAUTHORIZED";
};

const ProfileComponent = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const loggedIn = useAuthStore(isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  const { data: me, isLoading, error } = useMeQuery(loggedIn ? token : null);

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/login");
    }
  }, [loggedIn, router]);

  useEffect(() => {
    if (isUnauthorizedError(error)) {
      logout();
    }
  }, [error, logout]);

  if (!loggedIn) {
    return null;
  }

  if (isLoading) {
    return <p className="text-ink-muted">내 정보를 불러오는 중...</p>;
  }

  if (!me) {
    return <p className="text-ink-muted">내 정보를 불러오지 못했어요.</p>;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="form-panel">
      <h1 className="form-title">{me.username}님, 환영해요!</h1>
      <p className="text-ink-sub">오늘도 메모를 남겨 보세요.</p>
      <div className="form-actions">
        <button type="button" onClick={handleLogout} className="btn-secondary">
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default ProfileComponent;
