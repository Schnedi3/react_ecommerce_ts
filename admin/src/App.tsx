import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RootLayout } from "./layout/RootLayout";
import {
  Login,
  NewProduct,
  NotFound,
  Orders,
  Products,
  ProtectedRoute,
  Users,
} from "./Routes";
import "./reset.css";
import "./main.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route index element={<NewProduct />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export const App = () => {
  return (
    <main className="app container">
      <ToastContainer
        autoClose={1500}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop={true}
      />

      <RouterProvider router={router} />
    </main>
  );
};
