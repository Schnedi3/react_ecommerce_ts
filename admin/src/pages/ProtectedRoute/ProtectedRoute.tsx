import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../../context/useAuthContext";
import { iconLoad } from "../../Routes";
import styles from "./protected.module.css";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return (
      <section className={styles.load}>
        <img className={styles.loadIcon} src={iconLoad} alt="" />
        <p className={styles.loadText}>Fetching data</p>
      </section>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
