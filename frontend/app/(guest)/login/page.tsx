"use client";

import GoogleLoginButtonComponent from "@/components/custom/auth/google-login-button-component";
import LoginFormComponent from "@/components/custom/auth/login-form-component";
import { useLoginMutation } from "@/hooks/use-login-mutation";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { mutate, isPending, error, reset } = useLoginMutation();
  const router = useRouter();

  const login = (email: string, password: string) => {
    mutate(
      { email, password },
      {
        onSuccess: () => {
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
        errorMessage={error ? error.message : ""}
        resetError={resetError}
      ></LoginFormComponent>
      <GoogleLoginButtonComponent />
    </main>
  );
};

export default LoginPage;
