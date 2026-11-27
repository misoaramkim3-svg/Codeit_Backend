-- 접속하지 않은 사용자에게 온 알림도 보관하기 위해 Notification 테이블을 만든다.
-- 받는 사람과 댓글, 문구를 저장하고 새 알림의 읽음 상태를 false로 시작한다.
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "recipientId" TEXT NOT NULL,
    "commentId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- 같은 댓글에 알림이 중복 저장되지 않도록 commentId를 고유 값으로 제한한다.
CREATE UNIQUE INDEX "Notification_commentId_key" ON "Notification"("commentId");

-- 사용자의 알림을 시간순으로 찾을 수 있도록 수신자 ID와 생성 시각을 함께 인덱싱한다.
CREATE INDEX "Notification_recipientId_createdAt_idx" ON "Notification"("recipientId", "createdAt");

-- 존재하는 사용자와 댓글에만 연결되도록 외래 키를 추가한다.
-- 수신자 또는 댓글이 삭제되면 연결된 알림도 함께 삭제한다.
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
