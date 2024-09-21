import { NavLink } from "react-router-dom";

import "./menu.css";

export const Menu = () => {
  return (
    <nav className="menu container">
      <article className="menu_logo">
        <h2>Shopify</h2>
        <h3>admin panel</h3>
      </article>

      <ul className="menu_links">
        <li>
          <NavLink to="/">New Product</NavLink>
        </li>
        <li>
          <NavLink to="/list">Manage Products</NavLink>
        </li>
        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>
        <li>
          <NavLink to="/users">Manage Users</NavLink>
        </li>
      </ul>
    </nav>
  );
};
