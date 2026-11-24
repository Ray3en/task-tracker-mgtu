// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Данные считаются свежими 30 секунд.
      staleTime: 30_000,

      // Неактивный кеш удаляется через 5 минут.
      gcTime: 5 * 60_000,

      // После ошибки выполняется одна повторная попытка.
      retry: 1,

      // Не обновляем запрос при возвращении во вкладку.
      refetchOnWindowFocus: false,

      // После восстановления интернета запрос можно повторить.
      refetchOnReconnect: true,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  // </StrictMode>,
);
