import { fromNodeHeaders } from "better-auth/node";
import { DefaultEventsMap, ExtendedError, Socket } from "socket.io";
import { auth } from "../lib/auth";
import { LoginLocalsType } from "./require-login";

export type LoginSocketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  LoginLocalsType
>;

export const requireSocketLogin = async (
  socket: LoginSocketType,
  next: (err?: ExtendedError) => void,
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(socket.handshake.headers),
    });
    if (!session) {
      next(new Error("로그인이 필요해요."));
      return;
    }

    socket.data.user = session.user;
    next();
  } catch (err) {
    next(err as Error);
  }
};
