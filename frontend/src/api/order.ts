import axios from "./axios";

export const addOrderRequest = (
  address_id: number,
  amount: number,
  payment_method: string
) => {
  return axios.post("/order", { address_id, amount, payment_method });
};

export const getUserOrdersRequest = () => {
  return axios.get("/order/user");
};
