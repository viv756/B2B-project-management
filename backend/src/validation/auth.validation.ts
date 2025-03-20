import { z } from "zod";

const emailSchema = z.string().trim().email("Invalid email address").min(1).max(255);
const passwordScheama = z.string().trim().min(4);

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: emailSchema,
  password: passwordScheama,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordScheama,
});
