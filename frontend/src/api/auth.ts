import axios from "./axios";

import { IAuth } from "../types/types";

export const loginRequest = (user: IAuth) => {
  return axios.post("/auth/login", user);
};

export const registerRequest = (user: IAuth) => {
  return axios.post("/auth/register", user);
};
