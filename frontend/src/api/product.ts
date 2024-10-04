import axios from "./axios";

export const getProductRequest = (id: number) => {
  return axios.get(`/product/${id}`);
};

export const getProductsRequest = () => {
  return axios.get("/product");
};
