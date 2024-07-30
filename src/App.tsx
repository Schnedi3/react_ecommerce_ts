import "./css/app.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import { Menu } from "./components/Menu";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";

export const App = () => {
  return (
    <main className="app">
      <CartProvider>
        <BrowserRouter>
          <Menu />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </main>
  );
};
