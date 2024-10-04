import axios from "./axios";

export const addProductRequest = (formData: FormData) => {
  return axios.post("/product", formData);
};

export const deleteProductRequest = (id: number) => {
  return axios.delete(`/product/${id}`);
};

export const getProductsRequest = () => {
  return axios.get("/product");
};
