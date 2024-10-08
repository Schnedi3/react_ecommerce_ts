import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext } from "../../context/useAuthContext";
import { loginSchema } from "../../schemas/schemas";
import { ILogin } from "../../types/types";

import { iconEyeClosed, iconEyeOpen } from "../../Routes";
import "./auth.css";
import "../globals.css";

export const ResetPassword = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const { resetPassword } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: ILogin) => {
    resetPassword(data);
    reset();
  };

  return (
    <section className="auth_container container">
      <form
        className="auth_form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <h2>Reset password</h2>

        <label>
          Email
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <input
            type="email"
            className={errors.email ? "input_error" : ""}
            placeholder="johndoe@lorem.com"
            {...register("email")}
          />
        </label>

        <label>
          New password
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <input
            type={visible ? "text" : "password"}
            className={errors.password ? "input_error" : ""}
            placeholder="A1b2C3d4"
            {...register("password")}
          />
          <button
            type="button"
            className="view_pass"
            onClick={() => setIsVisible(!visible)}
          >
            <img
              src={visible ? iconEyeOpen : iconEyeClosed}
              alt="password visibility"
            />
          </button>
        </label>

        <button className="dark_button dark_button-auth" type="submit">
          Set new password
        </button>
      </form>
    </section>
  );
};
