import axios from "axios";

const api = axios.create({
  baseURL: "http://172.27.65.171:8822",
});

export default api;

