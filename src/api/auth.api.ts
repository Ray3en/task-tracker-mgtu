type User = {
  id: number;
  email: string;
};

export type LoginData = {
  email: string;
  password: string;
};
export type RegisterData = {
  email: string;
  name: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

const baseUrl = import.meta.env.VITE_API_URL || "";

export async function refreshApi(): Promise<AuthResponse> {
  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Не удалось обновить токен");
  }

  return response.json();
}

export async function loginApi(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Не удалось выполнить вход");
  }

  return response.json();
}

export async function registerApi(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Не удалось выполнить вход");
  }

  return response.json();
}

export async function meApi(): Promise<User> {
  const response = await fetch(`${baseUrl}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Не удалось получить пользователя");
  }

  return response.json();
}

export async function logoutApi(): Promise<void> {
  const response = await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Не удалось выйти из аккаунта");
  }
}
