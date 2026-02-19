import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7230/api",   // 🔴 MUST MATCH BACKEND PORT
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;