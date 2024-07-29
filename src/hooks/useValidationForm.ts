import { FormValues } from "../types/types";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const schema = zod.object({
  name: zod.string().min(8, { message: "Must be more than 8 characters" }),
  email: zod.string().email({ message: "Invalid email address" }),
  message: zod
    .string()
    .min(10, { message: "Must be more than 10 characters" })
    .max(80, { message: "Must be less than 50 characters" }),
});

export const useValidateForm = () => {
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setSuccessMessage("Form submitted successfully!");
    reset();
  };

  return { register, handleSubmit, onSubmit, errors, successMessage };
};
