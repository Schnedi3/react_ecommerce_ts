import { createContext, PropsWithChildren, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { adminRequest } from "../api/auth";
import { AuthContextType, ILogin, IUser } from "../types/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (user: ILogin) => {
    try {
      const response = await adminRequest(user);

      if (response.data.success) {
        setUser(response.data.result);
        setIsAuthenticated(true);
        Cookies.set("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.result));
      } else {
        console.log(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Invalid admin credentials");
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const checkAuth = () => {
    const token = Cookies.get("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
