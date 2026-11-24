import axios from "axios";

// axios - удобнный http-метод для организации сететвых запросов
// удобен вместо fetch
// npm i axios

// импортируем url из .env

// создаем единый baseUrl
export const baseUrl = import.meta.env.VITE_API_URL || "";

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
