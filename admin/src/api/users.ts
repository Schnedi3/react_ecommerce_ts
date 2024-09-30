import axios from "./axios";

export const getUsersRequest = () => {
  return axios.get("/user");
};

export const deleteUserRequest = (id: number) => {
  return axios.delete(`/user/${id}`);
};