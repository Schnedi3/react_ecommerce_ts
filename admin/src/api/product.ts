import axios from "./axios";

export const addProductRequest = (formData: FormData) => {
  return axios.post("/product/add", formData);
};

export const listProductsRequest = () => {
  return axios.get("/product/list");
};

export const removeProductRequest = (id: number) => {
  return axios.delete(`/product/list/${id}`);
};
