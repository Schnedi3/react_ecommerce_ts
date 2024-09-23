import { createContext, PropsWithChildren, useState } from "react";
import { toast } from "react-toastify";

import { CartItem, CartContextType, IProduct } from "../types/types";
import {
  addToCartRequest,
  deleteFromCartRequest,
  getCartRequest,
  updateCartRequest,
} from "../api/cart";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const getCart = async () => {
    try {
      const response = await getCartRequest();

      if (response.data.success) {
        setCart(response.data.rows);
      } else {
        console.log(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      console.log(error.message);
    }
  };

  const addToCart = async (product: IProduct, quantity: number) => {
    try {
      const response = await addToCartRequest(product.id, quantity);

      if (response.data.success) {
        const newItem = response.data.cartItem;
        setCart([...cart, newItem]);
        getCart();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const quantityInCart = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const updateQuantity = async (product_id: number, quantity: number) => {
    try {
      const response = await updateCartRequest(product_id, quantity);

      if (response.data.success) {
        const updateItem = response.data.cartItem;
        setCart(
          cart.map((item) => (item.id === product_id ? updateItem : item))
        );
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteProduct = async (product_id: number) => {
    try {
      const response = await deleteFromCartRequest(product_id);

      if (response.data.success) {
        setCart(cart.filter((item) => item.id !== product_id));
        toast.success(response.data.message);
        getCart();
      } else {
        toast.error(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const totalCart = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        getCart,
        quantityInCart,
        addToCart,
        updateQuantity,
        deleteProduct,
        totalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
