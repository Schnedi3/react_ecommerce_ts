import axios from "./axios";

export const getCartRequest = () => {
  return axios.get("/cart/get");
};

export const addToCartRequest = (product_id: number, quantity: number) => {
  return axios.post("/cart/add", { product_id, quantity });
};

export const updateCartRequest = (product_id: number, quantity: number) => {
  return axios.put("/cart/update", { product_id, quantity });
};

export const deleteFromCartRequest = (product_id: number) => {
  return axios.delete("/cart/delete", { data: { product_id } });
};
