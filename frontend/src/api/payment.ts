import axios from "./axios";

export const createCheckoutSessionRequest = (
  cartItems: unknown,
  address_id: number,
  amount: number,
  payment_method: string
) => {
  return axios.post("/payment/checkout-session", {
    cartItems,
    address_id,
    amount,
    payment_method,
  });
};

export const fetchCheckoutSessionRequest = (sessionId: string) => {
  return axios.get(`/payment/checkout-session?session_id=${sessionId}`);
};
