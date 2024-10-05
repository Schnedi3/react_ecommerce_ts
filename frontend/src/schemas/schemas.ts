import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Field required")
    .min(8, "Must be at least 8 characters"),
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
    .min(8, "Must be at least 8 characters"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Field required")
    .min(3, "Must be at least 3 characters")
    .max(20, "Username must be at most 20 characters long"),
  email: z.string().min(1, "Field required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Field required")
    .min(8, "Must be at least 8 characters"),
});

export const addressSchema = z.object({
  firstName: z.string().min(1, "Field required"),
  lastName: z.string().min(1, "Field required"),
  phone: z
    .string()
    .min(1, "Field required")
    .regex(/^[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/, {
      message: "Invalid phone number format",
    }),
  street: z.string().min(1, "Field required"),
  number: z.string().min(1, "Field required"),
  door: z.string().min(1, "Field required"),
  city: z.string().min(1, "Field required"),
  state: z.string().min(1, "Field required"),
  zipCode: z.string().min(1, "Field required"),
});
