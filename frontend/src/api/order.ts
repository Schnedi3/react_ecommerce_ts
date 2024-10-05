import axios from "./axios";

export const addOrderRequest = (
  address_id: number,
  amount: number,
  payment_method: string
) => {
  return axios.post("/order", { address_id, amount, payment_method });
};

export const addStripeOrderRequest = (
  address_id: number,
  amount: number,
  payment_method: string,
  session_id: string
) => {
  return axios.post("/order/stripe", {
    address_id,
    amount,
    payment_method,
    session_id,
  });
};

export const getUserOrdersRequest = () => {
  return axios.get("/order/user");
};
