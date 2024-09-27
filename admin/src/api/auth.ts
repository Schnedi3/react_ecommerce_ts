import axios from "./axios";
import { ILogin } from "../types/types";

export const loginRequest = (user: ILogin) => {
  return axios.post("/auth/login", user);
};

export const adminRequest = (user: ILogin) => {
  return axios.post("/auth/admin", user);
};
