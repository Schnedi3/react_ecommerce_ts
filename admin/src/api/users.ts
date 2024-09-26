import axios from "./axios";

export const getUsersRequest = () => {
  return axios.get("/user");
};

export const removeUserRequest = (id: number) => {
  return axios.delete(`/user/${id}`);
};