import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { contactSchema, loginSchema, registerSchema } from "../schemas/schemas";
import { IContact, ILogin } from "../types/types";
import { useAuthContext } from "../context/useAuthContext";

export const useValidateContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IContact>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: IContact) => {
    console.log(data);
    reset();
  };

  return { register, handleSubmit, onSubmit, errors };
};

export const useValidateLogin = (isSignUp: boolean) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>({
    resolver: zodResolver(isSignUp ? registerSchema : loginSchema),
  });

  const { login, signup } = useAuthContext();

  const onSubmit = (data: ILogin) => {
    isSignUp ? signup(data) : login(data);
    reset();
  };

  return { register, handleSubmit, onSubmit, errors };
};
