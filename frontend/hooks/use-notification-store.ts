import {
  loadNotificationsApi,
  type NotificationResponse,
} from "@/api/notifications-api";
import { create } from "zustand";

// 계정을 바꿔도 자신의 결과만 보도록 목록과 조회 상태에 사용자 ID를 함께 저장한다.
type NotificationList = {
  userId: string;
  status: "loading" | "success" | "error";
  items: NotificationResponse[];
};

type NotificationStoreType = {
  list: NotificationList | null;
  latestEvent: { userId: string } | null;
  hasUnread: boolean;
  loadNotifications: (userId: string, signal: AbortSignal) => Promise<void>;
  receiveNotification: (userId: string) => void;
  clearUnreadBadge: () => void;
};

export const useNotificationStore = create<NotificationStoreType>((set) => ({
  list: null,
  latestEvent: null,
  hasUnread: false,

  // DB의 목록으로 통째로 교체해 알림창을 반복해서 열어도 같은 알림이 쌓이지 않게 한다.
  // 요청을 취소했다면 해당 응답이 이후 조회 결과를 덮어쓰지 않도록 상태 갱신을 건너뛴다.
  loadNotifications: async (userId, signal) => {
    set({ list: { userId, status: "loading", items: [] } });
    try {
      const items = await loadNotificationsApi(signal);
      if (!signal.aborted) {
        set({ list: { userId, status: "success", items } });
      }
    } catch {
      if (!signal.aborted) {
        set({ list: { userId, status: "error", items: [] } });
      }
    }
  },

  // Socket.IO 이벤트가 오면 새 이벤트와 빨간 점 상태를 저장한다.
  // 열린 알림창은 이 이벤트를 보고 서버 목록을 다시 가져온다.
  receiveNotification: (userId) =>
    set({ latestEvent: { userId }, hasUnread: true }),
  clearUnreadBadge: () => set({ hasUnread: false }),
}));
