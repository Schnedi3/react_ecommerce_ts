import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import { Menu, Footer } from "./Routes";
import {
  Cart,
  Confirmation,
  Contact,
  Detail,
  Home,
  Login,
  Orders,
  OrderSummary,
  Profile,
  Register,
  User,
} from "./Routes";

import "./app.css";

export const App = () => {
  return (
    <main className="app">
      <ToastContainer autoClose={2000} pauseOnHover={false} />
      <BrowserRouter>
        <ShopProvider>
          <AuthProvider>
            <Menu />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Detail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/user" element={<User />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>

            <Footer />
          </AuthProvider>
        </ShopProvider>
      </BrowserRouter>
    </main>
  );
};
