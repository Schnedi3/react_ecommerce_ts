import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Menu } from "./components/Menu/Menu";

import { NewProduct } from "./pages/NewProduct/NewProduct";
import { Products } from "./pages/Products/Products";
import { Orders } from "./pages/Orders/Orders";
import { Users } from "./pages/users/Users";

import "./app.css";

export const App = () => {
  return (
    <main className="app">
      <ToastContainer autoClose={2000} pauseOnHover={false} />
      <BrowserRouter>
        <Menu />

        <Routes>
          <Route path="/" element={<NewProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};
