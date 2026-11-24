"use client";

import FormMessageComponent from "@/components/custom/form/form-message-component";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/sign-up-schema";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { z } from "zod";

const SignUpFormComponent = (props: {
  signUp: (email: string, password: string, username: string) => void;
  isPending: boolean;
  isDuplicateEmail: boolean;
  errorMessage: string;
  resetError: () => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useLayoutEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setUsername("");
    };
  }, []);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((prev: string) => {
      return e.target.value;
    });
    props.resetError();
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev: string) => {
      return e.target.value;
    });
  };
  const handleChangePasswordConfirm = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirm((prev: string) => {
      return e.target.value;
    });
  };
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername((prev: string) => {
      return e.target.value;
    });
  };

  const result = signUpSchema.safeParse({
    email,
    password,
    passwordConfirm,
    username,
  });
  const fieldErrors = result.success
    ? {}
    : z.flattenError(result.error).fieldErrors;

  const emailError = email ? (fieldErrors.email?.[0] ?? "") : "";
  const showDuplicateEmail = !emailError && props.isDuplicateEmail;
  const passwordError = password ? (fieldErrors.password?.[0] ?? "") : "";
  const passwordConfirmError = passwordConfirm
    ? (fieldErrors.passwordConfirm?.[0] ?? "")
    : "";
  const usernameError = username ? (fieldErrors.username?.[0] ?? "") : "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!result.success) {
      return;
    }

    props.signUp(email, password, username);
  };

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <h1 className="form-title">회원가입</h1>
      <Field data-invalid={!!emailError || showDuplicateEmail}>
        <FieldLabel htmlFor="signup-email">이메일</FieldLabel>
        <Input
          value={email}
          onChange={handleChangeEmail}
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!emailError || showDuplicateEmail}
          aria-describedby="signup-email-message"
        />
        <FormMessageComponent
          id="signup-email-message"
          className="field-message"
          message={
            showDuplicateEmail ? "이미 가입된 이메일이에요." : emailError
          }
          action={
            showDuplicateEmail && (
              <Link href="/login" className="form-message-link">
                로그인하기
              </Link>
            )
          }
        />
      </Field>
      <Field data-invalid={!!passwordError}>
        <FieldLabel htmlFor="signup-password">비밀번호</FieldLabel>
        <Input
          value={password}
          onChange={handleChangePassword}
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!passwordError}
          aria-describedby="signup-password-message"
        />
        <FormMessageComponent
          id="signup-password-message"
          className="field-message"
          message={passwordError}
        />
      </Field>
      <Field data-invalid={!!passwordConfirmError}>
        <FieldLabel htmlFor="signup-password-confirm">비밀번호 확인</FieldLabel>
        <Input
          value={passwordConfirm}
          onChange={handleChangePasswordConfirm}
          id="signup-password-confirm"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!passwordConfirmError}
          aria-describedby="signup-password-confirm-message"
        />
        <FormMessageComponent
          id="signup-password-confirm-message"
          className="field-message"
          message={passwordConfirmError}
        />
      </Field>
      <Field data-invalid={!!usernameError}>
        <FieldLabel htmlFor="signup-username">유저네임</FieldLabel>
        <Input
          value={username}
          onChange={handleChangeUsername}
          id="signup-username"
          name="username"
          type="text"
          autoComplete="username"
          aria-invalid={!!usernameError}
          aria-describedby="signup-username-message"
        />
        <FormMessageComponent
          id="signup-username-message"
          className="field-message"
          message={usernameError}
        />
      </Field>
      <div>
        <FormMessageComponent
          urgent
          className="form-error"
          message={props.errorMessage}
        />
        <div className="form-actions">
          <button
            type="submit"
            disabled={!result.success || props.isPending}
            className="btn-primary"
          >
            {props.isPending && (
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
            )}
            {props.isPending ? "가입 중..." : "회원가입"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpFormComponent;
