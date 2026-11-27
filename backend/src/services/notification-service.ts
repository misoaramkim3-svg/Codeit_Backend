import { prisma } from "../lib/prisma";

// 알림 목록을 사용자별로 분리하기 위해 수신자 ID로 조회한다.
// 생성 시각과 ID를 내림차순으로 정렬해, 생성 시각이 같아도 표시 순서를 유지한다.
// 목록에 필요한 ID, 문구, 읽음 상태, 생성 시각만 반환한다.
export const getNotifications = (recipientId: string) => {
  return prisma.notification.findMany({
    where: { recipientId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    select: {
      id: true,
      message: true,
      isRead: true,
      createdAt: true,
    },
  });
};

// 다른 사용자의 알림을 바꾸지 않도록 알림 ID와 수신자 ID를 함께 조건에 넣는다.
// 조건에 맞는 알림의 isRead를 true로 저장하고, 갱신 대상이 있었는지 반환한다.
export const markNotificationAsRead = async (
  notificationId: number,
  recipientId: string,
) => {
  const { count } = await prisma.notification.updateMany({
    where: { id: notificationId, recipientId },
    data: { isRead: true },
  });

  return count > 0;
};
