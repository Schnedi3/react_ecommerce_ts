import axios from "./axios";

export const addProductRequest = (formData: FormData) => {
  return axios.post("/product", formData);
};

export const getProductsRequest = () => {
  return axios.get("/product");
};

export const removeProductRequest = (id: number) => {
  return axios.delete(`/product/${id}`);
};
