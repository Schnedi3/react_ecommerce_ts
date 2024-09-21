import axios from "./axios";

export const usersRequest = () => {
  return axios.get("/users/list");
};

export const removeUserRequest = (id: number) => {
  return axios.delete(`/users/list/${id}`);
};