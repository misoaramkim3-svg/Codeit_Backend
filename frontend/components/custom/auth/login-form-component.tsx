"use client";

import FormMessageComponent from "@/components/custom/form/form-message-component";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/login-schema";
import { LoaderCircle } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { z } from "zod";

const LoginFormComponent = (props: {
  login: (email: string, password: string) => void;
  isPending: boolean;
  errorMessage: string;
  resetError: () => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useLayoutEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
    };
  }, []);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    props.resetError();
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    props.resetError();
  };

  const result = loginSchema.safeParse({ email, password });
  const fieldErrors = result.success
    ? {}
    : z.flattenError(result.error).fieldErrors;

  const emailError = email ? (fieldErrors.email?.[0] ?? "") : "";
  const passwordError = password ? (fieldErrors.password?.[0] ?? "") : "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!result.success) {
      return;
    }

    props.login(email, password);
  };

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <h1 className="form-title">로그인</h1>
      <Field data-invalid={!!emailError}>
        <FieldLabel htmlFor="login-email">이메일</FieldLabel>
        <Input
          value={email}
          onChange={handleChangeEmail}
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!emailError}
          aria-describedby="login-email-message"
        />
        <FormMessageComponent
          id="login-email-message"
          className="field-message"
          message={emailError}
        />
      </Field>
      <Field data-invalid={!!passwordError}>
        <FieldLabel htmlFor="login-password">비밀번호</FieldLabel>
        <Input
          value={password}
          onChange={handleChangePassword}
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={!!passwordError}
          aria-describedby="login-password-message"
        />
        <FormMessageComponent
          id="login-password-message"
          className="field-message"
          message={passwordError}
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
            {props.isPending ? "로그인 중..." : "로그인"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginFormComponent;
