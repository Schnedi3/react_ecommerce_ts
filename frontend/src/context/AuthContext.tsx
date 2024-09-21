import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContextType, IAuth } from "../types/types";
import { loginRequest, registerRequest } from "../api/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IAuth | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const signup = async (user: IAuth) => {
    try {
      const response = await registerRequest(user);

      if (response.data.success) {
        setUser(response.data);
        setIsAuthenticated(true);
        toast.success(response.data.message, {
          autoClose: 2000,
          pauseOnHover: false,
        });
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        toast.error(response.data.message, {
          autoClose: 2000,
          pauseOnHover: false,
        });
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
        setUser(response.data);
        setIsAuthenticated(true);
        toast.success(response.data.message, {
          autoClose: 2000,
          pauseOnHover: false,
        });
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        toast.error(response.data.message, {
          autoClose: 2000,
          pauseOnHover: false,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    toast.success("User logged out succesfully", {
      autoClose: 2000,
      pauseOnHover: false,
    });
    navigate("/");
  };

  const checkAuth = () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
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
