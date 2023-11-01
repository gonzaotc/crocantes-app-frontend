import axios from "axios";
import { getTokenFromLocalStorage } from "./token";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
