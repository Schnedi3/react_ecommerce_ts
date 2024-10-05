import axios from "./axios";

export const updateUsernameRequest = (username: string, id: number) => {
  return axios.put(`/user/${id}`, { username });
};
