import axios from "./axios";

export const addOrderRequest = () => {
  return axios.post("/order");
};

export const getOrdersRequest = () => {
  return axios.get("/order");
};

export const getOrderRequest = (id: number) => {
  return axios.delete(`/order/${id}`);
};
