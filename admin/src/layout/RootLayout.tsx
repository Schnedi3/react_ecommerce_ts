import { Outlet } from "react-router-dom";

import { Menu } from "../Routes";
import { AuthProvider } from "../context/AuthContext";

export const RootLayout = () => {
  return (
    <section>
      <AuthProvider>
        <Menu />
        <Outlet />
      </AuthProvider>
    </section>
  );
};
