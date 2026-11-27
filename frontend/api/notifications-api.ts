import { apiClient } from "@/lib/api-client";

// 서버의 JSON 응답에 맞춰 알림 필드를 정의한다. 생성 시각은 문자열로 받는다.
export type NotificationResponse = {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
};

// 내 알림을 조회하기 위해 로그인 쿠키를 보내는 공용 클라이언트를 사용한다.
// 서버의 목록을 반환하고, 알림창이 닫히거나 계정이 바뀌면 요청을 취소할 수 있게 한다.
export const loadNotificationsApi = async (signal: AbortSignal) => {
  const { data } = await apiClient.get<NotificationResponse[]>(
    "/notifications",
    { signal },
  );
  return data;
};
