import { useContext } from "react";
import { ShopContext } from "./ShopContext";

export const useShopContext = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShoptContext must be used inside the ShopProvider");
  }

  return context;
};
