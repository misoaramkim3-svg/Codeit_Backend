"use client";

import LoginFormComponent from "@/components/custom/auth/login-form-component";
import { useLoginMutation } from "@/hooks/use-login-mutation";
import { AppError } from "@/lib/app-error";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

const isLoginFailedError = (error: unknown): error is AppError => {
  return error instanceof AppError && error.type === "LOGIN_FAILED";
};

const LOGIN_FAILED_MESSAGE =
  "이메일 또는 비밀번호가 맞지 않아요. 다시 확인해 주세요.";

const getErrorMessage = (error: Error | null) => {
  if (!error) {
    return "";
  }
  return isLoginFailedError(error) ? LOGIN_FAILED_MESSAGE : error.message;
};

const LoginPage = () => {
  const { mutate, isPending, error, reset } = useLoginMutation();
  const saveToken = useAuthStore((state) => state.saveToken);
  const router = useRouter();

  const login = (email: string, password: string) => {
    mutate(
      { email, password },
      {
        onSuccess: (result) => {
          if (result === undefined) {
            return;
          }
          saveToken(result.token);
          router.push("/memos");
        },
      },
    );
  };

  const resetError = () => {
    if (error) {
      reset();
    }
  };

  return (
    <main className="page-narrow">
      <LoginFormComponent
        login={login}
        isPending={isPending}
        errorMessage={getErrorMessage(error)}
        resetError={resetError}
      ></LoginFormComponent>
    </main>
  );
};

export default LoginPage;
