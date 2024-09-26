import axios from "./axios";

export const getProductsRequest = () => {
  return axios.get("/product");
};

export const getProductRequest = (id: number) => {
  return axios.get(`/product/${id}`);
};
