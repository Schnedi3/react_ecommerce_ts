import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { CartItem, CartContextType, IProduct, IAddress } from "../types/types";
import {
  addToCartRequest,
  deleteFromCartRequest,
  getCartRequest,
  updateCartRequest,
} from "../api/cart";
import { getAddressRequest } from "../api/address";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [itemsInCart, setItemsInCart] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<IAddress[]>([]);

  const getCart = async () => {
    try {
      const response = await getCartRequest();

      if (response.data.success) {
        setCart(response.data.result);
      } else {
        console.log(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const addToCart = async (
    product: IProduct,
    quantity: number,
    selectedSize: string
  ) => {
    if (!selectedSize) return toast.error("Select a size first");

    try {
      const response = await addToCartRequest(
        product.id,
        quantity,
        selectedSize
      );

      if (response.data.success) {
        const newItem = response.data.result;
        setCart([...cart, newItem]);
        await getCart();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const updateQuantity = async (
    product_id: number,
    quantity: number,
    size: string
  ) => {
    try {
      const response = await updateCartRequest(product_id, quantity, size);

      if (response.data.success) {
        const updateItem = response.data.result;
        setCart(
          cart.map((item) => (item.id === product_id ? updateItem : item))
        );
        await getCart();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const deleteProduct = async (product_id: number, size: string) => {
    try {
      const response = await deleteFromCartRequest(product_id, size);

      if (response.data.success) {
        setCart(cart.filter((item) => item.id !== product_id));
        await getCart();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    const quantityInCart = cart.reduce((acc, item) => acc + item.quantity, 0);
    setItemsInCart(quantityInCart);
  }, [cart]);

  useEffect(() => {
    const totalCart = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(totalCart);
  }, [cart]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const getAddress = async () => {
    try {
      const response = await getAddressRequest();

      if (response.data.success) {
        setAddressList(response.data.result);
      } else {
        console.log(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        getCart,
        addToCart,
        updateQuantity,
        deleteProduct,
        itemsInCart,
        totalAmount,
        isModalOpen,
        setIsModalOpen,
        addressList,
        setAddressList,
        getAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
