import { createContext, PropsWithChildren, useState } from "react";
import { Product } from "../types/types";

interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  deleteProduct: (productId: number) => void;
  totalCart: () => number;
  emptyCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Item detail page
  const addToCart = (product: Product) => {
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
  };

  // Cart page
  const decreaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const increaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const deleteProduct = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const totalCart = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        deleteProduct,
        totalCart,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
