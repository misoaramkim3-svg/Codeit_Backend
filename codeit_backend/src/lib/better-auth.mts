import "dotenv/config";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { verifyPassword as verifyBetterAuthPassword } from "better-auth/crypto";
import { betterAuth } from "better-auth/minimal";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import type { IncomingHttpHeaders } from "node:http";
import { prisma } from "../db/prisma.js";
import { signupSchema } from "../schemas/auth-schemas.js";
import { hashPassword, verifyPassword } from "./password.js";

export const betterAuthPath = "/api/better-auth";

const googleClientId: string = process.env.GOOGLE_CLIENT_ID?.trim() ?? "";
const googleClientSecret: string =
  process.env.GOOGLE_CLIENT_SECRET?.trim() ?? "";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: betterAuthPath,
  trustedOrigins: ["http://127.0.0.1:3000"],
  socialProviders:
    googleClientId !== "" && googleClientSecret !== ""
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
            prompt: "select_account",
          },
        }
      : {},
  database: prismaAdapter(prisma, {
    provider: "postgresql",
    transaction: true,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 1,
    password: {
      hash: hashPassword,
      verify: ({ hash, password }) =>
        hash.startsWith("$2") || hash.startsWith("v1:")
          ? verifyPassword(password, hash)
          : verifyBetterAuthPassword({ hash, password }),
    },
  },
  session: {
    modelName: "betterAuthSession",
    expiresIn: 15 * 60,
    disableSessionRefresh: true,
  },
  hooks: {
    before: createAuthMiddleware(async (context) => {
      if (context.path !== "/sign-up/email") return;
      const input = signupSchema.safeParse({
        ...context.body,
        username: context.body?.name,
      });
      if (!input.success) {
        throw new APIError("BAD_REQUEST", {
          message: "이메일, 비밀번호, 유저이름을 확인해 주세요.",
        });
      }
      const existingUser = await prisma.betterAuthUser.findUnique({
        where: { email: input.data.email },
        select: { id: true },
      });
      if (existingUser) {
        throw new APIError("CONFLICT", {
          message: "이미 가입된 이메일이에요.",
        });
      }
      return {
        context: {
          body: {
            ...context.body,
            email: input.data.email,
            name: input.data.username,
          },
        },
      };
    }),
  },
  databaseHooks: {
    account: {
      create: {
        after: async (account, context) => {
          if (context?.path === "/sign-up/email") {
            console.info("회원가입 완료", { userId: account.userId });
          }
        },
      },
    },
    session: {
      create: {
        before: async (session, context) => {
          if (context?.path !== "/sign-in/email") return;
          const user = await prisma.betterAuthUser.findUnique({
            where: { id: session.userId },
            select: { name: true },
          });
          const username = context.headers?.get("x-memoit-username");
          if (!user || username !== encodeURIComponent(user.name)) {
            throw new APIError("UNAUTHORIZED", {
              message: "로그인 정보가 맞지 않아요.",
            });
          }
        },
      },
    },
  },
  advanced: { cookiePrefix: "memoit-better-auth" },
  user: { modelName: "betterAuthUser" },
  account: { modelName: "betterAuthAccount" },
  verification: { modelName: "betterAuthVerification" },
});

export const betterAuthHandler = toNodeHandler(auth);

export async function getBetterAuthUserId(headers: IncomingHttpHeaders) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(headers),
    query: { disableRefresh: true },
  });
  return session?.user.id;
}
