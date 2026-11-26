import { useState } from "react";
import "../index.css";
import { ThemeContext } from "../context/themeContext";
import { Navigate, Route, Routes } from "react-router";
import TasksPage from "../pages/TasksPage";
import AboutPage from "../pages/AboutPage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CreateProductPage from "../pages/CreateProductPage";
import { PrivateRoute } from "../Layouts/PrivateRoute";
import AuthLayout from "../Layouts/AuthLayout";
import DefaultLayout from "../Layouts/DefaultLayout";
import ProfilePage from "../pages/ProfilePage";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");


  return (
    <>
      {/* Provider - "облако", в которое мы помещаем состояние и сетСтейт для дочерних компонентов  */}
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Navigate to={"/tasks"} replace />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products/create" element={<CreateProductPage />} />
            {/* Приватный роут который сверяет авторизацию */}

            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<h2>Not found</h2>} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
