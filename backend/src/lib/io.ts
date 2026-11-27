import { DefaultEventsMap, Server } from "socket.io";
import { LoginLocalsType } from "../middlewares/require-login";
import { requireSocketLogin } from "../middlewares/require-socket-login";
import { FRONTEND_URL } from "./config";

export const io = new Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  LoginLocalsType
>({
  cors: { origin: FRONTEND_URL, credentials: true },
});

io.use(requireSocketLogin);

io.on("connection", (socket) => {
  console.log(`소켓 연결: ${socket.id}`);
  socket.join(socket.data.user.id);
});
