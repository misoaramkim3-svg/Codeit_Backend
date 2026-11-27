"use client";

import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMeQuery } from "@/hooks/use-me-query";
import { useNotificationStore } from "@/hooks/use-notification-store";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

// API가 문자열로 보낸 생성 시각을 브라우저에서 읽기 쉬운 시간으로 표시한다.
const formatTime = (createdAt: string) =>
  new Date(createdAt).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

const NotificationPopover = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);

  // Zustand는 여러 화면이 공유하므로 지금 로그인한 계정의 목록과 이벤트만 읽는다.
  const list = useNotificationStore((state) =>
    state.list?.userId === userId ? state.list : null,
  );
  const latestEvent = useNotificationStore((state) =>
    state.latestEvent?.userId === userId ? state.latestEvent : null,
  );
  const hasUnread = useNotificationStore((state) => state.hasUnread);
  const loadNotifications = useNotificationStore(
    (state) => state.loadNotifications,
  );
  const clearUnreadBadge = useNotificationStore(
    (state) => state.clearUnreadBadge,
  );

  // 알림창을 열거나 열린 상태에서 새 댓글 알림이 오면 목록을 조회한다.
  // 새 조회를 시작할 때와 알림창을 닫을 때 이전 요청을 취소한다.
  useEffect(() => {
    if (!open) {
      return;
    }

    clearUnreadBadge();
    const controller = new AbortController();
    void loadNotifications(userId, controller.signal);
    return () => controller.abort();
  }, [open, latestEvent, userId, loadNotifications, clearUnreadBadge]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="nav-link relative"
        aria-label={latestEvent && hasUnread ? "알림 (새 알림 있음)" : "알림"}
      >
        <Bell className="size-6" aria-hidden />
        {latestEvent && hasUnread && (
          <span className="notification-dot" aria-hidden />
        )}
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverTitle className="notification-title">알림</PopoverTitle>
        {/* 조회 상태를 먼저 표시하고, 성공했을 때만 목록이 비어 있는지 확인한다. */}
        {(!list || list.status === "loading") && (
          <p className="notification-empty" role="status">
            알림을 불러오는 중이에요.
          </p>
        )}
        {list?.status === "error" && (
          <p className="notification-empty" role="alert">
            알림을 불러오지 못했어요. 닫았다가 다시 열어 주세요.
          </p>
        )}
        {list?.status === "success" && list.items.length === 0 && (
          <p className="notification-empty">아직 알림이 없어요.</p>
        )}
        {list?.status === "success" && list.items.length > 0 && (
          <ul className="notification-list">
            {list.items.map((notification) => (
              <li key={notification.id} className="notification-item">
                <p>{notification.message}</p>
                <p className="meta">{formatTime(notification.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
};

// 계정이 바뀌면 이전 계정의 열린 알림창도 닫히도록 사용자 ID를 React key로 사용한다.
const NotificationButtonComponent = () => {
  const { data: me } = useMeQuery();

  if (!me) {
    return null;
  }

  return <NotificationPopover key={me.id} userId={me.id} />;
};

export default NotificationButtonComponent;
