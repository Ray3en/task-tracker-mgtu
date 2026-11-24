import { useState } from 'react'
import '../index.css'
import { ThemeContext } from '../context/themeContext';
import { Navigate, Route, Routes } from 'react-router';
import TasksPage from '../pages/TasksPage';
import AboutPage from '../pages/AboutPage';
import Layout from '../Layout';
import AuthLayout from '../AuthLayout';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import ProtectedRoute from './ProtectedRoute';
import CreateProductPage from '../pages/CreateProductPage';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Создайте страницу AboutPage и вынесите его в route
  // <h1>This is about page!</h1>
  return (
    <>
      {/* Provider - "облако", в которое мы помещаем состояние и сетСтейт для дочерних компонентов  */}
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to={'/tasks'} replace />} />
            <Route path='/tasks' element={<TasksPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/product/:id' element={<ProductDetailPage />} />
            <Route path='/products/create' element={<CreateProductPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/profile' element={<ProfilePage />} />
            </Route>
            <Route path='/about' element={<AboutPage />} />
            <Route path='*' element={<h2>Not found</h2>} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
          </Route>
        </Routes>
      </ThemeContext.Provider>
    </>
  );
}


export default App
