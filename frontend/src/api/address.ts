import axios from "./axios";

import { IAddress } from "../types/types";

export const getAddressRequest = () => {
  return axios.get("/address/");
};

export const addAddressRequest = (address: IAddress) => {
  return axios.post("/address/", address);
};

export const removeAddressRequest = (id: number) => {
  return axios.delete(`/address/${id}`);
};
