import { FormValues } from "../types/types";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const contactSchema = zod.object({
  name: zod
    .string()
    .min(1, "Field required")
    .min(8, "Must be more than 8 characters"),
  email: zod.string().min(1, "Field required").email("Invalid email address"),
  message: zod
    .string()
    .min(1, "Field required")
    .min(10, "Must be more than 10 characters")
    .max(50, "Must be less than 50 characters"),
});

export const useValidateForm = () => {
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setSuccessMessage("Form submitted successfully!");
    reset();
  };

  return { register, handleSubmit, onSubmit, errors, successMessage };
};
