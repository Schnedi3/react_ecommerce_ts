import axios from "./axios";

export const getCartRequest = () => {
  return axios.get("/cart");
};

export const addToCartRequest = (product_id: number, quantity: number) => {
  return axios.post(`/cart/${product_id}`, { quantity });
};

export const updateCartRequest = (product_id: number, quantity: number) => {
  return axios.put(`/cart/${product_id}`, { quantity });
};

export const removeFromCartRequest = (product_id: number) => {
  return axios.delete(`/cart/${product_id}`);
};
