import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import {
  Login,
  Menu,
  NewProduct,
  Orders,
  Products,
  ProtectedRoute,
  Users,
} from "./Routes";

import "./app.css";

export const App = () => {
  return (
    <main className="app container">
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
