"use client";

import { useMeQuery } from "@/hooks/use-me-query";
import { useNotificationStore } from "@/hooks/use-notification-store";
import { API_URL } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { io } from "socket.io-client";

const ProtectedLayout = ({ children }: LayoutProps<"/">) => {
  const router = useRouter();
  const { data: me, isPending } = useMeQuery();
  const userId = me?.id;
  const receiveNotification = useNotificationStore(
    (state) => state.receiveNotification,
  );

  useEffect(() => {
    if (!isPending && !me) {
      router.replace("/");
    }
  }, [isPending, me, router]);

  // 로그인한 계정이 확인되면 소켓을 연결하고, 이벤트를 받으면 이 계정의 새 알림을 표시한다.
  // 계정이 바뀌거나 페이지를 벗어나면 기존 소켓 연결을 끊는다.
  useEffect(() => {
    if (!userId) {
      return;
    }

    const socket = io(API_URL, { withCredentials: true });

    socket.on("message", () => {
      receiveNotification(userId);
    });

    return () => {
      socket.disconnect();
    };
  }, [receiveNotification, userId]);

  if (!me) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
