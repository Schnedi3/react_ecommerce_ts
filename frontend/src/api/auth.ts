import axios from "./axios";

import { ILogin, IRegister } from "../types/types";

export const loginRequest = (user: ILogin) => {
  return axios.post("/login", user);
};

export const registerRequest = (user: IRegister) => {
  return axios.post("/register", user);
};
