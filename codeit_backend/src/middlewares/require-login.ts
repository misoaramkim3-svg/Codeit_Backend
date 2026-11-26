import type { NextFunction, Request, Response } from "express";

export type LoginLocals = { userId: string };

export async function requireLogin(
  req: Request,
  res: Response<unknown, LoginLocals>,
  next: NextFunction,
) {
  res.set("Cache-Control", "no-store");

  const { getBetterAuthUserId } = await import("../lib/better-auth.mjs");
  const userId = await getBetterAuthUserId(req.headers);
  if (!userId) {
    res.status(401).json({ message: "로그인이 필요합니다." });
    return;
  }

  res.locals.userId = userId;
  next();
}
