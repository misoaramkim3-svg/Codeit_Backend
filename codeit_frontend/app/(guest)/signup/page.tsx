"use client";

import SignUpFormComponent from "@/components/custom/auth/sign-up-form-component";
import { useSignUpMutation } from "@/hooks/use-sign-up-mutation";
import { AppError } from "@/lib/app-error";
import { useRouter } from "next/navigation";

const isDuplicateEmailError = (error: unknown): error is AppError => {
  return error instanceof AppError && error.type === "DUPLICATE_EMAIL";
};

const SignupPage = () => {
  const { mutate, isPending, error, reset } = useSignUpMutation();
  const router = useRouter();

  const signUp = (email: string, password: string, username: string) => {
    mutate(
      { email, password, username },
      {
        onSuccess: () => {
          router.push("/login?signup=success");
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
      <SignUpFormComponent
        signUp={signUp}
        isPending={isPending}
        isDuplicateEmail={isDuplicateEmailError(error)}
        errorMessage={
          error && !isDuplicateEmailError(error) ? error.message : ""
        }
        resetError={resetError}
      ></SignUpFormComponent>
    </main>
  );
};

export default SignupPage;
