import axios from "axios";

const api = axios.create({
  baseURL: "http://172.30.80.176:8822",
});

export default api;

