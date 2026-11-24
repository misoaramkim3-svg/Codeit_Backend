import fakeServer from "@/fake-server";
import { AppError } from "@/lib/app-error";
import type { NewUserType } from "@/types";

export const signUpApi = async (newUser: NewUserType) => {
  try {
    return await fakeServer.signUp(newUser);
  } catch (error) {
    if (error instanceof AppError && error.type === "SERVER_ERROR") {
      console.error("회원가입 서버 에러:", error);
      return;
    }
    throw error;
  }
};

export const loginApi = async (params: { email: string; password: string }) => {
  try {
    return await fakeServer.login(params.email, params.password);
  } catch (error) {
    if (error instanceof AppError && error.type === "SERVER_ERROR") {
      console.error("로그인 서버 에러:", error);
      return;
    }
    throw error;
  }
};

export const getMeApi = async (token: string) => {
  try {
    return await fakeServer.getMe(token);
  } catch (error) {
    if (error instanceof AppError && error.type === "SERVER_ERROR") {
      console.error("내 정보 서버 에러:", error);
      return null;
    }
    throw error;
  }
};
