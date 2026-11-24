import axios, { type InternalAxiosRequestConfig } from "axios";

// axios - удобнный http-метод для организации сететвых запросов
// удобен вместо fetch
// npm i axios

// импортируем url из .env

// создаем единый baseUrl
export const baseUrl = import.meta.env.VITE_API_URL || ''

export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
    headers: {
    "Content-Type": "application/json",
  },
});

type RetryableRequest = InternalAxiosRequestConfig & { _retry?: boolean };
let refreshRequest: Promise<string> | null = null;

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config as RetryableRequest | undefined;
    const isAuthRequest = request?.url?.includes("/auth/login") || request?.url?.includes("/auth/refresh");

    if (error.response?.status !== 401 || !request || request._retry || isAuthRequest) {
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      refreshRequest ??= axios
        .post<{ token: string }>(`${baseUrl}/auth/refresh`, {}, { withCredentials: true })
        .then((response) => {
          localStorage.setItem("accessToken", response.data.token);
          return response.data.token;
        })
        .finally(() => {
          refreshRequest = null;
        });

      const token = await refreshRequest;
      request.headers.Authorization = `Bearer ${token}`;
      return apiClient(request);
    } catch (refreshError) {
      localStorage.removeItem("accessToken");
      return Promise.reject(refreshError);
    }
  },
);
