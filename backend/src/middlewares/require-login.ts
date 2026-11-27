import { fromNodeHeaders } from "better-auth/node";
import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { ErrorResultType } from "../types";

export type LoginLocalsType = {
  user: typeof auth.$Infer.Session.user;
};

export const requireLogin = async (
  req: Request,
  res: Response<ErrorResultType, LoginLocalsType>,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) {
    res.status(401).json({ message: "로그인이 필요해요." });
    return;
  }

  res.locals.user = session.user;
  next();
};
