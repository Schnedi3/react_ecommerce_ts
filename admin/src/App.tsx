import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Menu } from "./components/Menu/Menu";

import { New } from "./pages/New/New";
import { List } from "./pages/List/List";
import { Orders } from "./pages/Orders/Orders";

import "./app.css";

export const App = () => {
  return (
    <main className="app">
      <ToastContainer />
      <BrowserRouter>
        <Menu />

        <Routes>
          <Route path="/" element={<New />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};
