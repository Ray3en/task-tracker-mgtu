// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router";
import { QueryProvider } from "./providers/QueryProvider";
import { AuthProvider } from "./providers/AuthProvider";

// QueryCleintProvider вынесли в отдельный компонент QueryProvider
// Создали удобный AuthProvider для данных авторизации

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </QueryProvider>,
  // </StrictMode>,
);
