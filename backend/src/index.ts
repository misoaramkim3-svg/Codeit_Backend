import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { createServer } from "node:http";
import { auth } from "./lib/auth";
import { FRONTEND_URL } from "./lib/config";
import { io } from "./lib/io";
import memosRouter from "./routes/memo-route";
import notificationsRouter from "./routes/notification-route";
import { ErrorResultType } from "./types";

const app = express();
const port = 3001;

app.use(morgan("dev"));
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/memos", memosRouter);

// GET /notifications 요청을 세션 확인과 알림 조회를 담당하는 라우터에 연결한다.
app.use("/notifications", notificationsRouter);

app.use(
  (
    err: Error,
    req: Request,
    res: Response<ErrorResultType>,
    next: NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ message: "서버에 문제가 생겼어요." });
  },
);

const httpServer = createServer(app);

io.attach(httpServer);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
