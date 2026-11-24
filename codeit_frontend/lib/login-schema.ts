import { z } from "zod";
import { emailSchema, passwordSchema } from "./sign-up-schema";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
