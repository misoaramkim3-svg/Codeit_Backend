"use client";

import { loginWithGoogleApi } from "@/api/auth-api";
import LoginFormComponent from "@/components/custom/auth/login-form-component";
import FormMessageComponent from "@/components/custom/form/form-message-component";
import { useLoginMutation } from "@/hooks/use-login-mutation";
import { AppError } from "@/lib/app-error";
import type { LoginRequest } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const isLoginFailedError = (error: unknown): error is AppError => {
  return error instanceof AppError && error.type === "LOGIN_FAILED";
};

const LOGIN_FAILED_MESSAGE = "이메일, 유저이름, 비밀번호를 다시 확인해 주세요.";

const getErrorMessage = (error: Error | null) => {
  if (!error) {
    return "";
  }
  return isLoginFailedError(error) ? LOGIN_FAILED_MESSAGE : error.message;
};

const LoginStatusMessage = () => {
  const searchParams = useSearchParams();
  const googleError = searchParams.get("error");
  if (googleError) {
    const message =
      googleError === "account_not_linked"
        ? "이미 이메일로 가입한 주소예요. 다른 Google 계정을 선택해 주세요."
        : "Google 로그인을 완료하지 못했어요. 다시 시도해 주세요.";
    return <FormMessageComponent urgent className="mb-6" message={message} />;
  }
  if (searchParams.get("signup") !== "success") {
    return null;
  }

  return (
    <p
      role="status"
      className="mb-6 rounded-md border border-line bg-paper-soft px-4 py-3 text-ink"
    >
      회원가입이 완료됐어요. 가입한 계정으로 로그인해 주세요.
    </p>
  );
};

const LoginPage = () => {
  const { mutate, isPending, error, reset } = useLoginMutation();
  const googleLogin = useMutation({ mutationFn: loginWithGoogleApi });
  const router = useRouter();

  const login = (request: LoginRequest) => {
    mutate(request, {
      onSuccess: () => {
        router.push("/memos");
      },
    });
  };

  const resetError = () => {
    if (error) {
      reset();
    }
  };

  return (
    <main className="page-narrow">
      <Suspense fallback={null}>
        <LoginStatusMessage />
      </Suspense>
      <h1 className="form-title mb-6">로그인</h1>
      <div className="mb-6 border-b border-line pb-6">
        <button
          type="button"
          className="btn-primary w-full"
          disabled={isPending || googleLogin.isPending}
          onClick={() => googleLogin.mutate()}
        >
          {googleLogin.isPending
            ? "Google 로그인 연결 중..."
            : "Google로 로그인"}
        </button>
        {googleLogin.isError && (
          <FormMessageComponent
            urgent
            className="mt-3"
            message="Google 로그인을 시작하지 못했어요. 다시 시도해 주세요."
          />
        )}
      </div>
      <LoginFormComponent
        login={login}
        isPending={isPending || googleLogin.isPending}
        errorMessage={getErrorMessage(error)}
        resetError={resetError}
      />
    </main>
  );
};

export default LoginPage;
