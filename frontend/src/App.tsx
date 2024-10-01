import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import { Menu } from "./components/Menu/Menu";
import { Home } from "./pages/Home/Home";
import { Detail } from "./pages/Detail/Detail";
import { Contact } from "./pages/Contact/Contact";
import { User } from "./pages/User/User";
import { Cart } from "./pages/Cart/Cart";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { PlaceOrder } from "./pages/PlaceOrder/PlaceOrder";
import { Orders } from "./pages/Orders/Orders";
import { Profile } from "./pages/Profile/Profile";
import { Footer } from "./components/Footer/Footer";

import "./app.css";

export const App = () => {
  return (
    <main className="app">
      <ToastContainer autoClose={2000} pauseOnHover={false} />
      <BrowserRouter>
        <CartProvider>
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
              <Route path="/place-order" element={<PlaceOrder />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>

            <Footer />
          </AuthProvider>
        </CartProvider>
      </BrowserRouter>
    </main>
  );
};
