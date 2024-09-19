import axios from "axios";

const baseURL = "http://localhost:4000/api";
const instance = axios.create({ baseURL });

export default instance;
