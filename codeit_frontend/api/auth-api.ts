import { authClient } from "@/lib/auth-client";
import { AppError } from "@/lib/app-error";
import type { LoginRequest, SignupRequest } from "@/types";

export async function signUpApi({ email, password, username }: SignupRequest) {
  const { error } = await authClient.signUp.email({
    email,
    password,
    name: username,
  });
  if (
    error?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL" ||
    error?.status === 409
  ) {
    throw new AppError("DUPLICATE_EMAIL", "이미 가입된 이메일이에요.");
  }
  if (error) {
    throw new AppError("SERVER_ERROR", "회원가입을 완료하지 못했어요.");
  }
}

export async function loginApi({ email, password, username }: LoginRequest) {
  const { error } = await authClient.signIn.email(
    { email, password },
    { headers: { "x-memoit-username": encodeURIComponent(username) } },
  );
  if (error?.status === 400 || error?.status === 401) {
    throw new AppError("LOGIN_FAILED", "로그인 정보가 맞지 않아요.");
  }
  if (error) {
    throw new AppError(
      "SERVER_ERROR",
      "로그인하지 못했어요. 다시 시도해 주세요.",
    );
  }
}

export async function loginWithGoogleApi() {
  const { error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/memos",
    errorCallbackURL: "/login",
  });
  if (error) {
    throw new AppError("SERVER_ERROR", "Google 로그인을 시작하지 못했어요.");
  }
}

export async function logoutApi() {
  const { error } = await authClient.signOut();
  if (error) {
    throw new AppError(
      "SERVER_ERROR",
      "로그아웃하지 못했어요. 다시 시도해 주세요.",
    );
  }
}
