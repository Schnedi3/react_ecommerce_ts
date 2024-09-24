import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { AuthContextType, IAuth } from "../types/types";
import { loginRequest, registerRequest } from "../api/auth";
import { useCartContext } from "./useCartContext";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { getCart, setCart } = useCartContext();
  const [user, setUser] = useState<IAuth | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const signup = async (user: IAuth) => {
    try {
      const response = await registerRequest(user);

      if (response.data.success) {
        setUser(response.data.result);
        setIsAuthenticated(true);
        getCart();
        toast.success(response.data.message);
        Cookies.set("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const login = async (user: IAuth) => {
    try {
      const response = await loginRequest(user);

      if (response.data.success) {
        setUser(response.data.result);
        setIsAuthenticated(true);
        getCart();
        toast.success(response.data.message);
        Cookies.set("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setCart([]);
    toast.success("User logged out succesfully");
    navigate("/");
  };

  const checkAuth = () => {
    const token = Cookies.get("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      getCart();
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
