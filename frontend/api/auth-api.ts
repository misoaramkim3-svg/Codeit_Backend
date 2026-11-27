import { AppError } from "@/lib/app-error";
import { authClient } from "@/lib/auth-client";

export type AuthUserType = {
  id: string;
  email: string;
  username: string;
};

const toAuthUser = (user: {
  id: string;
  email: string;
  name: string;
}): AuthUserType => ({
  id: user.id,
  email: user.email,
  username: user.name,
});

export const signUpApi = async (newUser: {
  email: string;
  password: string;
  username: string;
}) => {
  const { data, error } = await authClient.signUp.email({
    email: newUser.email,
    password: newUser.password,
    name: newUser.username,
  });
  if (error) {
    if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
      throw new AppError("DUPLICATE_EMAIL", "이미 가입된 이메일이에요.");
    }
    throw new AppError(
      "SERVER_ERROR",
      "회원가입하지 못했어요. 잠시 후 다시 시도해 주세요.",
    );
  }
  return toAuthUser(data.user);
};

export const loginApi = async (params: { email: string; password: string }) => {
  const { data, error } = await authClient.signIn.email(params);
  if (error) {
    if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
      throw new AppError(
        "LOGIN_FAILED",
        "이메일 또는 비밀번호가 맞지 않아요. 다시 확인해 주세요.",
      );
    }
    throw new AppError(
      "SERVER_ERROR",
      "로그인하지 못했어요. 잠시 후 다시 시도해 주세요.",
    );
  }
  return toAuthUser(data.user);
};

export const getMeApi = async () => {
  const { data, error } = await authClient.getSession();
  if (error) {
    throw new AppError(
      "SERVER_ERROR",
      "내 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
    );
  }
  if (!data) {
    return null;
  }
  return toAuthUser(data.user);
};

export const googleLoginApi = async () => {
  const { error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: `${window.location.origin}/memos`,
    errorCallbackURL: `${window.location.origin}/login`,
  });
  if (error) {
    throw new AppError(
      "SERVER_ERROR",
      "구글 로그인을 시작하지 못했어요. 잠시 후 다시 시도해 주세요.",
    );
  }
};

export const logoutApi = async () => {
  const { error } = await authClient.signOut();
  if (error) {
    throw new AppError(
      "SERVER_ERROR",
      "로그아웃하지 못했어요. 잠시 후 다시 시도해 주세요.",
    );
  }
};
