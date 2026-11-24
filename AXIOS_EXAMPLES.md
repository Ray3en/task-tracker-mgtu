# Axios в React: шаблоны запросов

Ниже собраны базовые примеры работы с Axios в React-приложении. В проекте API доступен по адресу из переменной `VITE_API_URL`.

## 1. Переменная окружения

Файл `.env.development`:

```env
VITE_API_URL=http://localhost:3010/api
```

После изменения `.env` перезапустите dev-сервер.

## 2. Общий Axios-клиент

```ts
// src/api/apiClient.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

Используйте один экземпляр `apiClient` во всех API-модулях. `withCredentials` разрешает браузеру отправлять `HttpOnly` refresh-cookie.

## 3. GET: получить список

```ts
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  discountPrice: number | null;
};

type ProductsResponse = {
  items: Product[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

export async function getProducts(page = 1, limit = 10) {
  const response = await apiClient.get<ProductsResponse>("/products", {
    params: { page, limit },
  });

  return response.data;
}
```

## 4. GET: получить одну сущность

```ts
export async function getProduct(id: number) {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
}
```

## 5. POST: создать сущность

```ts
type CreateProductData = {
  name: string;
  price: number;
  description: string;
};

export async function createProduct(data: CreateProductData) {
  const response = await apiClient.post<Product>("/products", data);
  return response.data;
}
```

## 6. PATCH и PUT

```ts
export async function updateProductPrice(id: number, price: number) {
  const response = await apiClient.patch<Product>(`/products/${id}`, { price });
  return response.data;
}

export async function replaceProduct(id: number, product: CreateProductData) {
  const response = await apiClient.put<Product>(`/products/${id}`, product);
  return response.data;
}
```

`PATCH` изменяет отдельные поля, а `PUT` обычно полностью заменяет сущность.

## 7. DELETE

```ts
export async function deleteProduct(id: number) {
  await apiClient.delete(`/products/${id}`);
}
```

При ответе `204 No Content` обращаться к `response.data` не требуется.

## 8. Вход и Bearer-токен

```ts
type LoginResponse = {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
};

export async function login(email: string, password: string) {
  const response = await apiClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("accessToken", response.data.token);
  return response.data.user;
}
```

Access-токен добавляется в каждый запрос interceptor-ом:

```http
Authorization: Bearer ACCESS_TOKEN
```

Refresh-токен JavaScript не читает: сервер устанавливает его в защищённую `HttpOnly` cookie.

## 9. Защищённый запрос профиля

```ts
type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

export async function getProfile() {
  const response = await apiClient.get<User>("/auth/me");
  return response.data;
}
```

## 10. Обновление access-токена

```ts
export async function refreshAccessToken() {
  const response = await apiClient.post<{ token: string }>("/auth/refresh");
  localStorage.setItem("accessToken", response.data.token);
  return response.data.token;
}
```

В текущем проекте обновление после ответа `401` уже выполняется автоматически в response interceptor файла `src/api/apiClient.ts`.

## 11. Выход

```ts
export async function logout() {
  try {
    await apiClient.post("/auth/logout");
  } finally {
    localStorage.removeItem("accessToken");
  }
}
```

Сервер удаляет refresh-сессию и очищает `HttpOnly` cookie.

## 12. Обработка ошибок

```ts
import { isAxiosError } from "axios";

try {
  await createProduct({
    name: "Кружка",
    price: 1200,
    description: "Керамическая кружка",
  });
} catch (error) {
  if (isAxiosError(error)) {
    console.error("Статус:", error.response?.status);
    console.error("Ответ API:", error.response?.data);
  } else {
    console.error("Неизвестная ошибка", error);
  }
}
```

## 13. Запрос в React через useEffect

```tsx
import { useEffect, useState } from "react";
import { getProducts } from "./api/products.api";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.items))
      .catch(() => setError("Не удалось загрузить товары"))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return products.map((product) => <p key={product.id}>{product.name}</p>);
}
```

## 14. Запрос через TanStack Query

```tsx
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./api/products.api";

function ProductsPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["products", 1],
    queryFn: () => getProducts(1, 10),
  });

  if (isPending) return <p>Загрузка...</p>;
  if (isError) return <p>Не удалось загрузить товары</p>;

  return data.items.map((product) => <p key={product.id}>{product.name}</p>);
}
```

## 15. Создание через TanStack Query

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "./api/products.api";

function CreateProductButton() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <button
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({
        name: "Кружка",
        price: 1200,
        description: "Керамическая кружка",
      })}
    >
      Создать товар
    </button>
  );
}
```

## Краткая структура API-слоя

```text
src/
  api/
    apiClient.ts      # baseURL, Bearer и refresh interceptor
    auth.api.ts       # login, profile, logout
    products.api.ts   # CRUD товаров
  pages/
    LoginPage.tsx
    ProfilePage.tsx
    ProductsPage.tsx
```

Компоненты отвечают за интерфейс, а HTTP-запросы рекомендуется хранить в отдельных файлах внутри `src/api`.


