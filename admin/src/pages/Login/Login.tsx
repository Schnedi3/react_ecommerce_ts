import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/useAuthContext";
import { ILogin } from "../../types/types";

import { iconEyeClosed, iconEyeOpen } from "../../Routes";
import "./login.css";
import "../globals.css";

export const Login = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>();
  const { isAuthenticated, login } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = (data: ILogin) => {
    login(data);
    reset();
  };

  useEffect(() => {
    if (isAuthenticated) return navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <main className="login_container container">
      <form
        className="login"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <h2>Login</h2>

        <label>
          Email
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <input
            type="email"
            className={errors.email ? "input_error" : ""}
            placeholder="johndoe@lorem.com"
            {...register("email", { required: "Email is required" })}
          />
        </label>

        <label>
          Password
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <input
            type={visible ? "text" : "password"}
            className={errors.password ? "input_error" : ""}
            placeholder="A1b2C3d4"
            {...register("password", { required: "Password is required" })}
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

        <button className="dark_button" type="submit">
          Login
        </button>
      </form>
    </main>
  );
};
