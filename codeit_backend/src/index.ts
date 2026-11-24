import cors from "cors";
import express from "express";
import morgan from "morgan";
import { memosRouter } from "./routes/memos-router";

const app = express();
const port = 3001;

// 3단계. 라우트에 도착하기 전에 등록 순서대로 미들웨어를 거친다.
app.use(morgan("dev"));

// 프론트엔드가 백엔드 API를 직접 호출할 때 브라우저가 응답을 읽도록 허용한다.
app.use(cors({ origin: "http://localhost:3000" }));

// JSON 요청 본문을 객체로 바꿔 라우트에서 req.body로 읽을 수 있게 한다.
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello fdsfssfsfd");
});

// 여기서 지정한 /memos와 라우터 내부의 /:id가 합쳐져 /memos/:id가 된다.
app.use("/memos", memosRouter);

// 서버 시작 시 3001번 포트를 열어 HTTP 요청을 받는다.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
