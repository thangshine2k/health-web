import axios from "axios";

export const api = axios.create({
  baseURL: "https://health-api-production-a9f7.up.railway.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});