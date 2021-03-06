import { AdminNavigation, AdminSideBar } from "../components/common";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({
  isAuth = false,
  role = "USER",
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      isAuth && role === "ADMIN" ? (
        <>
          <AdminNavigation />
          <main className="content-admin">
            <AdminSideBar />
            <div className="content-admin-wrapper">
              <Component {...props} />
            </div>
          </main>
        </>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth,
  role: auth?.role || "",
});

export default connect(mapStateToProps)(AdminRoute);
