import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Field is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  email: z.string().min(1, "Field is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Field is required")
    .min(8, "Password must be at least 8 characters long"),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Field is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Field is required")
    .min(8, "Password must be at least 8 characters long"),
});
