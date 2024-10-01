import axios from "./axios";

export const getCartRequest = () => {
  return axios.get("/cart");
};

export const addToCartRequest = (
  product_id: number,
  quantity: number,
  size: string
) => {
  return axios.post(`/cart/${product_id}`, { quantity, size });
};

export const updateCartRequest = (
  product_id: number,
  quantity: number,
  size: string
) => {
  return axios.put(`/cart/${product_id}`, { quantity, size });
};

export const deleteFromCartRequest = (product_id: number, size: string) => {
  return axios.delete(`/cart/${product_id}`, { data: { size } });
};
