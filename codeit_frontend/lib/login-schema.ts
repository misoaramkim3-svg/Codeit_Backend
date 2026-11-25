import { z } from "zod";
import { emailSchema } from "./sign-up-schema";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "비밀번호를 입력해 주세요."),
  username: z.string().trim().min(1, "유저이름을 입력해 주세요."),
});
