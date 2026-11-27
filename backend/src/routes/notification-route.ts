import express, { type Response } from "express";
import {
  type LoginLocalsType,
  requireLogin,
} from "../middlewares/require-login";
import { notificationParamsSchema } from "../schemas/notification-schema";
import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notification-service";
import { type ErrorResultType } from "../types";

const notificationsRouter = express.Router();

// 알림은 개인 데이터이므로 먼저 세션을 확인한다. 로그인하지 않으면 401로 응답한다.
notificationsRouter.use(requireLogin);

notificationsRouter.get(
  "/",
  async (_req, res: Response<unknown, LoginLocalsType>) => {
    // 세션에서 수신자 ID를 가져와 조회하므로 로그인한 사람의 알림만 반환한다.
    const notifications = await getNotifications(res.locals.user.id);

    // 개인 알림은 매번 최신 목록을 응답하도록 캐시에 저장하지 않는다.
    res.set("Cache-Control", "no-store").json(notifications);
  },
);

// 내 알림을 읽음으로 저장하기 위해 경로의 ID를 검증한 뒤 세션의 사용자 ID와 함께 전달한다.
// 저장하면 204를 반환하고, 내 알림에서 대상을 찾을 수 없으면 404를 반환한다.
notificationsRouter.patch(
  "/:id/read",
  async (req, res: Response<ErrorResultType, LoginLocalsType>) => {
    const result = notificationParamsSchema.safeParse(req.params);
    if (!result.success) {
      res.status(400).json({ message: "알림 ID가 올바르지 않아요." });
      return;
    }

    const updated = await markNotificationAsRead(
      result.data.id,
      res.locals.user.id,
    );
    if (!updated) {
      res.status(404).json({ message: "알림을 찾을 수 없어요." });
      return;
    }

    res.status(204).end();
  },
);

export default notificationsRouter;
