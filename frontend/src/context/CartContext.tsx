import { createContext, PropsWithChildren, useState } from "react";
import { toast } from "react-toastify";

import { IProduct, CartItem, CartContextType } from "../types/types";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Item detail page
  const addToCart = (product: IProduct) => {
    setCart((prevCart) => {
      const onCart = prevCart.find((item) => item.id === product.id);
      if (onCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    toast.success("Product added to the cart", {
      autoClose: 2000,
      pauseOnHover: false,
    });
  };

  // Menu
  const quantityInCart = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Cart page
  const updateQuantity = (productId: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const deleteProduct = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));

    toast.success("Product removed", {
      autoClose: 2000,
      pauseOnHover: false,
    });
  };

  const totalCart = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
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
