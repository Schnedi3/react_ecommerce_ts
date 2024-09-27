import axios from "./axios";

export const getOrdersRequest = () => {
  return axios.get("/order");
};

export const addOrderRequest = (
  address_id: number,
  amount: number,
  payment_method: string
) => {
  return axios.post("/cart", { address_id, amount, payment_method });
};

export const getOrderRequest = () => {
  return axios.get("/order");
};
