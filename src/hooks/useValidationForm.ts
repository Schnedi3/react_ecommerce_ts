import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { IContactForm } from "../types/types";

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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: IContactForm) => {
    console.log(data);
    setIsSubmitted(true);
    reset();
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return { register, handleSubmit, onSubmit, errors, isSubmitted };
};
