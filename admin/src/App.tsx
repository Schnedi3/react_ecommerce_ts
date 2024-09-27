import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";

import { Menu } from "./components/Menu/Menu";
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { NewProduct } from "./pages/NewProduct/NewProduct";
import { Products } from "./pages/Products/Products";
import { Orders } from "./pages/Orders/Orders";
import { Users } from "./pages/users/Users";

import "./app.css";

export const App = () => {
  return (
    <main className="app">
      <ToastContainer autoClose={2000} pauseOnHover={false} />
      <AuthProvider>
        <BrowserRouter>
          <Menu />

          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<NewProduct />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </main>
  );
};
