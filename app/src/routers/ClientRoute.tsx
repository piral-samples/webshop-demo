import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { adminDashboard, signin } from "../constants/routes";

const PrivateRoute = ({
  isAuth = false,
  role = "USER",
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) => {
      if (isAuth && role === "USER") {
        return (
          <main className="content">
            <Component {...props} />
          </main>
        );
      }

      if (isAuth && role === "ADMIN") {
        return <Redirect to={adminDashboard} />;
      }

      return (
        <Redirect
          to={{
            pathname: signin,
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth,
  role: auth?.role || "",
});

export default connect(mapStateToProps)(PrivateRoute);
