import axios from "./axios";

import { ILogin, IRegister } from "../types/types";

export const loginRequest = (user: ILogin) => {
  return axios.post("/auth/login", user);
};

export const registerRequest = (user: IRegister) => {
  return axios.post("/auth/register", user);
};

export const loginGoogleRequest = (accessToken: string) => {
  return axios.post("/auth/google", { accessToken });
};
