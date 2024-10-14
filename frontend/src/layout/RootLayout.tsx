import { Outlet } from "react-router-dom";

import { Footer, Menu } from "../Routes";
import { AuthProvider } from "../context/AuthContext";

export const RootLayout = () => {
  return (
    <section>
      <AuthProvider>
        <Menu />
        <Outlet />
        <Footer />
      </AuthProvider>
    </section>
  );
};
