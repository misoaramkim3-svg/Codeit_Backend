import { z } from "zod";

const MAX_USERNAME_LENGTH = 5;

export const emailSchema = z.email("올바른 이메일 형식으로 입력해 주세요.");

export const passwordSchema = z
  .string()
  .regex(/[a-z]/, "비밀번호에 영문 소문자를 1개 이상 넣어 주세요.")
  .regex(/[A-Z]/, "비밀번호에 영문 대문자를 1개 이상 넣어 주세요.")
  .regex(/[!-/:-@[-`{-~]/, "비밀번호에 특수문자를 1개 이상 넣어 주세요.");

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string(),
    username: z
      .string()
      .min(1, "유저네임을 입력해 주세요.")
      .max(
        MAX_USERNAME_LENGTH,
        `유저네임은 ${MAX_USERNAME_LENGTH}자 이하로 입력해 주세요.`,
      ),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: "비밀번호가 일치하지 않아요.",
    path: ["passwordConfirm"],
  });
