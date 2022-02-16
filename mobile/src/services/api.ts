import axios from "axios";

const api = axios.create({
  baseURL: "http://172.17.207.232:8822",
});

export default api;

