import axios from "./axios";

export const deleteUserRequest = (id: number) => {
  return axios.delete(`/user/${id}`);
};

export const getUsersRequest = () => {
  return axios.get("/user");
};
