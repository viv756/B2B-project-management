import { z } from "zod";

export const emojiSchema = z.string().trim().optional();
export const nameSchema = z.string().trim().min(1).max(255);
export const descriptionSchema = z.string().trim().optional();

export const createProjectSchema = z.object({
  emoji: emojiSchema,
  name: nameSchema,
  description: descriptionSchema,
});
