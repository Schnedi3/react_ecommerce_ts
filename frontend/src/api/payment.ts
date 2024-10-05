import axios from "./axios";

export const createCheckoutSessionRequest = (
  cartItems: unknown,
  addressId: number,
  amount: number,
  paymentMethod: string
) => {
  return axios.post("/payment/checkout-session", {
    cartItems,
    addressId,
    amount,
    paymentMethod,
  });
};

export const fetchCheckoutSessionRequest = (sessionId: string) => {
  return axios.get(`/payment/checkout-session?session_id=${sessionId}`);
};
