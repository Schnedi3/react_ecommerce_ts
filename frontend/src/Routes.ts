// api
import { addAddressRequest } from "./api/address";
import { deleteAddressRequest } from "./api/address";
import { getAddressRequest } from "./api/address";
import { loginGoogleRequest } from "./api/auth";
import { loginRequest } from "./api/auth";
import { registerRequest } from "./api/auth";
import { addToCartRequest } from "./api/cart";
import { deleteFromCartRequest } from "./api/cart";
import { getCartRequest } from "./api/cart";
import { updateCartRequest } from "./api/cart";
import { addOrderRequest } from "./api/order";
import { getUserOrdersRequest } from "./api/order";
import { createCheckoutSessionRequest } from "./api/payment";
import { fetchCheckoutSessionRequest } from "./api/payment";
import { getProductRequest } from "./api/product";
import { getProductsRequest } from "./api/product";

export {
  addAddressRequest,
  deleteAddressRequest,
  getAddressRequest,
  loginGoogleRequest,
  loginRequest,
  registerRequest,
  addToCartRequest,
  deleteFromCartRequest,
  getCartRequest,
  updateCartRequest,
  addOrderRequest,
  getUserOrdersRequest,
  createCheckoutSessionRequest,
  fetchCheckoutSessionRequest,
  getProductRequest,
  getProductsRequest,
};

//components
import { AddressModal } from "./components/AddressModal/AddressModal";
import { Footer } from "./components/Footer/Footer";
import { Menu } from "./components/Menu/Menu";

export { AddressModal, Footer, Menu };

//icons
import iconAddress from "./assets/icons/address.svg";
import iconBox from "./assets/icons/box.svg";
import iconCart from "./assets/icons/cart.svg";
import iconClose from "./assets/icons/close.svg";
import iconConfirm from "./assets/icons/confirm.svg";
import iconDelete from "./assets/icons/delete.svg";
import iconEyeClosed from "./assets/icons/eye_closed.svg";
import iconEyeOpen from "./assets/icons/eye_open.svg";
import iconGoogle from "./assets/icons/google.svg";
import iconLogin from "./assets/icons/login.svg";
import iconMenu from "./assets/icons/menu.svg";
import iconModal from "./assets/icons/modal.svg";
import iconSearch from "./assets/icons/search.svg";

export {
  iconAddress,
  iconBox,
  iconCart,
  iconClose,
  iconConfirm,
  iconDelete,
  iconEyeClosed,
  iconEyeOpen,
  iconGoogle,
  iconLogin,
  iconMenu,
  iconModal,
  iconSearch,
};

// pages
import { Cart } from "./pages/Cart/Cart";
import { Contact } from "./pages/Contact/Contact";
import { Detail } from "./pages/Detail/Detail";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Logout } from "./pages/Logout/Logout";
import { Orders } from "./pages/Orders/Orders";
import { OrderSummary } from "./pages/OrderSummary/OrderSummary";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register/Register";
import { User } from "./pages/User/User";
import { Confirmation } from "./pages/Confirmation/Confirmation";

export {
  Cart,
  Confirmation,
  Contact,
  Detail,
  Home,
  Login,
  Logout,
  Orders,
  OrderSummary,
  Profile,
  Register,
  User,
};
