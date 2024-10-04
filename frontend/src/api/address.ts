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

export const updateAddressRequest = (address: IAddress, id: number) => {
  return axios.put(`/address/${id}`, address);
};
