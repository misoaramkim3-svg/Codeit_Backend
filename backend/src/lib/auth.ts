import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { FRONTEND_URL } from "./config";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  trustedOrigins: [FRONTEND_URL],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    fields: {
      name: "username",
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (
        ctx.path !== "/sign-up/email" ||
        typeof ctx.body?.email !== "string"
      ) {
        return;
      }
      const found = await ctx.context.internalAdapter.findUserByEmail(
        ctx.body.email.toLowerCase(),
      );
      if (found) {
        throw APIError.from("UNPROCESSABLE_ENTITY", {
          code: "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
          message: "User already exists. Use another email.",
        });
      }
    }),
  },
});
