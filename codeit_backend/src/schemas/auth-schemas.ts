import { z } from "zod";
import { fitsBcryptPassword } from "../lib/password";

const emailSchema = z.string().trim().toLowerCase().pipe(z.email());

export const signupSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .refine(fitsBcryptPassword, "비밀번호는 72바이트 이하여야 해요.")
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/[!-/:-@[-`{-~]/),
  username: z.string().trim().min(1).max(5),
});
