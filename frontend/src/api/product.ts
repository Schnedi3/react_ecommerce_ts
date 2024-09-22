import axios from "./axios";

export const listProductsRequest = () => {
  return axios.get("/product/list");
};

export const singleProductRequest = (id: number) => {
  return axios.get(`/product/list/${id}`);
};
