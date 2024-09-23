import axios from "axios";

axios.defaults.withCredentials = true;

const baseURL = "http://localhost:4000/api";
const instance = axios.create({ baseURL });

export default instance;
