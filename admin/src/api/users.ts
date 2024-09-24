import axios from "./axios";

export const getUsersRequest = () => {
  return axios.get("/user/list");
};

export const removeUserRequest = (id: number) => {
  return axios.delete(`/user/list/${id}`);
};