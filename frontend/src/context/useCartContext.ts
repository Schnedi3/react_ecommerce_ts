import { useContext } from "react";
import { CartContext } from "./CartContext"

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used inside the CartProvider");
  }

  return context;
};