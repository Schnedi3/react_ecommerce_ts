import axios from "./axios";

import { IAddress } from "../types/types";

export const addAddressRequest = (address: IAddress) => {
  return axios.post("/address/", address);
};

export const deleteAddressRequest = (id: number) => {
  return axios.delete(`/address/${id}`);
};

export const getAddressRequest = () => {
  return axios.get("/address/");
};
