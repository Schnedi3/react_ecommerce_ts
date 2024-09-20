import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import { Menu } from "./components/Menu/Menu";
import { Home } from "./pages/Home/Home";
import { Detail } from "./pages/Detail/Detail";
import { Contact } from "./pages/Contact/Contact";
import { Login } from "./pages/Login/Login";
import { Cart } from "./pages/Cart/Cart";
import { Footer } from "./components/Footer/Footer";

import "./app.css";

export const App = () => {
  return (
    <main className="app">
      <ToastContainer />
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Menu />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Detail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>

            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </main>
  );
};
