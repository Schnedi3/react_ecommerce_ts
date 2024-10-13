// api
import { adminRequest, loginRequest } from "./api/auth";
import {
  deleteOrderRequest,
  getOrderRequest,
  getOrdersRequest,
  updateOrderRequest,
} from "./api/order";
import {
  addProductRequest,
  deleteProductRequest,
  getProductsRequest,
} from "./api/product";
import { deleteUserRequest, getUsersRequest } from "./api/users";

export {
  adminRequest,
  loginRequest,
  deleteOrderRequest,
  getOrderRequest,
  getOrdersRequest,
  updateOrderRequest,
  addProductRequest,
  deleteProductRequest,
  getProductsRequest,
  deleteUserRequest,
  getUsersRequest,
};

// components
import { Menu } from "./components/Menu/Menu";
import { Title } from "./components/Title/Title";

export { Menu, Title };

// icons
import iconBox from "./assets/icons/box.svg";
import iconClose from "./assets/icons/close.svg";
import iconDelete from "./assets/icons/delete.svg";
import iconEyeClosed from "./assets/icons/eye_closed.svg";
import iconEyeOpen from "./assets/icons/eye_open.svg";
import iconList from "./assets/icons/list.svg";
import iconMenu from "./assets/icons/menu.svg";
import iconUpload from "./assets/icons/upload.svg";

export {
  iconBox,
  iconClose,
  iconDelete,
  iconEyeClosed,
  iconEyeOpen,
  iconList,
  iconMenu,
  iconUpload,
};

// pages
import { Login } from "./pages/Login/Login";
import { NewProduct } from "./pages/NewProduct/NewProduct";
import { Orders } from "./pages/Orders/Orders";
import { Products } from "./pages/Products/Products";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Users } from "./pages/users/Users";

export { Login, NewProduct, Orders, Products, ProtectedRoute, Users };
