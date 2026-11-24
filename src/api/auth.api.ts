import { apiClient } from "./apiClient";

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

type AuthResponse = {
  user: User;
  token: string;
};

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>("/auth/login", { email, password });
  return response.data;
}

export async function getProfile(): Promise<User> {
  const response = await apiClient.get<User>("/auth/me");
  return response.data;
}

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}
