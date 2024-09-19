import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Field required")
    .min(8, "Must be more than 8 characters"),
  email: z.string().min(1, "Field required").email("Invalid email address"),
  message: z
    .string()
    .min(1, "Field required")
    .min(10, "Must be more than 10 characters")
    .max(50, "Must be less than 50 characters"),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Field required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Field required")
    .min(8, "Must be more than 8 characters"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Field required")
    .min(3, "Must be more than 3 characters"),
  email: z.string().min(1, "Field required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Field required")
    .min(8, "Must be more than 8 characters"),
});
