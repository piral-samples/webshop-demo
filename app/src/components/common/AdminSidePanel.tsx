import * as React from "react";
import { NavLink } from "react-router-dom";
import { adminProducts } from "../../constants/routes";

const SideNavigation = () => (
  <aside className="sidenavigation">
    <div className="sidenavigation-wrapper">
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={adminProducts}
        >
          Products
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <h4 className="sidenavigation-menu my-0">Users</h4>
      </div>
    </div>
  </aside>
);

export default SideNavigation;
