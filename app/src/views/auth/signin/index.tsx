import * as React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { SocialLogin } from "../../../components/common";
import { CustomInput } from "../../../components/formik";
import { forgotPassword, signup } from "../../../constants/routes";
import { Field, Form, Formik } from "formik";
import { useDocumentTitle, useScrollTop } from "../../../hooks";
import { signIn } from "../../../redux/actions/authActions";
import {
  setAuthenticating,
  setAuthStatus,
} from "../../../redux/actions/miscActions";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const SignIn = ({ history }) => {
  const { authStatus, isAuthenticating } = useSelector((state) => ({
    authStatus: state.app.authStatus,
    isAuthenticating: state.app.isAuthenticating,
  }));

  const dispatch = useDispatch();

  useScrollTop();
  useDocumentTitle("Sign In | Lunetas-cam");

  React.useEffect(
    () => () => {
      dispatch(setAuthStatus(null));
      dispatch(setAuthenticating(false));
    },
    []
  );

  const onSignUp = () => history.push(signup);

  const onSubmitForm = (form) => {
    dispatch(signIn(form.email, form.password));
  };

  const onClickLink = (e) => {
    if (isAuthenticating) e.preventDefault();
  };

  return (
    <div className="auth-content">
      {authStatus?.success && (
        <div className="loader">
          <h3 className="toast-success auth-success">
            {authStatus.message}
            <LoadingOutlined />
          </h3>
        </div>
      )}
      {!authStatus?.success && (
        <>
          {authStatus?.message && (
            <h5 className="text-center toast-error">{authStatus?.message}</h5>
          )}
          <div
            className={`auth ${
              authStatus?.message && !authStatus?.success && "input-error"
            }`}
          >
            <div className="auth-main">
              <h3>Sign in to Lunetas-cam</h3>
              <br />
              <div className="auth-wrapper">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validateOnChange
                  validationSchema={SignInSchema}
                  onSubmit={onSubmitForm}
                >
                  {() => (
                    <Form>
                      <div className="auth-field">
                        <Field
                          disabled={isAuthenticating}
                          name="email"
                          type="email"
                          label="Email"
                          placeholder="test@example.com"
                          component={CustomInput}
                        />
                      </div>
                      <div className="auth-field">
                        <Field
                          disabled={isAuthenticating}
                          name="password"
                          type="password"
                          label="Password"
                          placeholder="Your Password"
                          component={CustomInput}
                        />
                      </div>
                      <br />
                      <div className="auth-field auth-action">
                        <Link
                          onClick={onClickLink}
                          style={{ textDecoration: "underline" }}
                          to={forgotPassword}
                        >
                          <span>Forgot password?</span>
                        </Link>
                        <button
                          className="button auth-button"
                          disabled={isAuthenticating}
                          type="submit"
                        >
                          {isAuthenticating ? "Signing In" : "Sign In"}
                          &nbsp;
                          {isAuthenticating ? (
                            <LoadingOutlined />
                          ) : (
                            <ArrowRightOutlined />
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="auth-divider">
              <h6>OR</h6>
            </div>
            <SocialLogin isLoading={isAuthenticating} />
          </div>
          <div className="auth-message">
            <span className="auth-info">
              <strong>Don&apos;t have an account?</strong>
            </span>
            <button
              className="button button-small button-border button-border-gray button-icon"
              disabled={isAuthenticating}
              onClick={onSignUp}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;
