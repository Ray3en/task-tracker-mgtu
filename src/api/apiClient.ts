import axios from "axios";
import { getAuthToken } from "./authToken";

// axios - удобнный http-метод для организации сететвых запросов
// удобен вместо fetch
// npm i axios

// импортируем url из .env

// создаем единый baseUrl
export const baseUrl = import.meta.env.VITE_API_URL || "";

export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Перед каждым запросом берём актуальный токен из AuthProvider.
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

