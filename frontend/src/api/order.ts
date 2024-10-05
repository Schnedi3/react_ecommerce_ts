import axios from "./axios";

export const addOrderRequest = (
  addressId: number,
  amount: number,
  paymentMethod: string
) => {
  return axios.post("/order", { addressId, amount, paymentMethod });
};

export const addStripeOrderRequest = (
  addressId: number,
  amount: number,
  paymentMethod: string,
  sessionId: string
) => {
  return axios.post("/order/stripe", {
    addressId,
    amount,
    paymentMethod,
    sessionId,
  });
};

export const getUserOrdersRequest = () => {
  return axios.get("/order/user");
};
