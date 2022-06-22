import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { adminDashboard, signin, signup } from "../constants/routes";

const PublicRoute = ({
  isAuth = false,
  role = "USER",
  component: Component,
  path = "/",
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      const { from } = props.location.state || { from: { pathname: "/" } };

      if (isAuth && role === "ADMIN") {
        return <Redirect to={adminDashboard} />;
      }

      if (isAuth && role === "USER" && (path === signin || path === signup)) {
        return <Redirect to={from} />;
      }

      return (
        <main className="content">
          <Component {...props} />
        </main>
      );
    }}
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth,
  role: auth?.role || "",
});

export default connect(mapStateToProps)(PublicRoute);
