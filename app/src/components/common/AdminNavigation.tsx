import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { adminDashboard } from "../../constants/routes";
import UserAvatar from "../../views/account/components/UserAvatar";
import logo from "../../images/logo-full.png";

const AdminNavigation = () => {
  const { isAuthenticating, profile } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    profile: state.profile,
  }));

  return (
    <nav className="navigation navigation-admin">
      <div className="logo">
        <Link
          to={adminDashboard}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img alt="Logo" src={logo} />
          <h3>ADMIN PANEL</h3>
        </Link>
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <UserAvatar isAuthenticating={isAuthenticating} profile={profile} />
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
