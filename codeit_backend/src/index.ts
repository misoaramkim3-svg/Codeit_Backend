import cors from "cors";
import express from "express";
import morgan from "morgan";
import { memosRouter } from "./routes/memos-router";

const app = express();
const host = "127.0.0.1";
const port = 3001;

// 3단계. 라우트에 도착하기 전에 등록 순서대로 미들웨어를 거친다.
app.use(morgan("dev"));

// 프론트엔드가 백엔드 API를 직접 호출할 때 브라우저가 응답을 읽도록 허용한다.
app.use(cors({ origin: "http://localhost:3000" }));

async function startServer() {
  // Better Auth는 JSON 미들웨어보다 먼저 원본 요청을 읽는다.
  const { betterAuthPath, betterAuthHandler } =
    await import("./lib/better-auth.mjs");
  app.all(`${betterAuthPath}/*splat`, betterAuthHandler);

  // JSON 요청 본문을 객체로 바꿔 라우트에서 req.body로 읽을 수 있게 한다.
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.send("Hello fdsfssfsfd");
  });

  // 여기서 지정한 /memos와 라우터 내부의 /:id가 합쳐져 /memos/:id가 된다.
  app.use("/memos", memosRouter);

  // 실습 API는 이 PC에서만 접근할 수 있게 연다.
  app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error("서버 설정을 확인하세요.", error);
  process.exitCode = 1;
});
