import * as React from "react";
import {
  FacebookOutlined,
  GithubFilled,
  GoogleOutlined,
} from "@ant-design/icons";

const SocialLogin = ({ isLoading }) => {
  return (
    <div className="auth-provider">
      <button
        className="button auth-provider-button provider-facebook"
        disabled={isLoading}
        type="button"
      >
        <FacebookOutlined />
        Continue with Facebook
      </button>
      <button
        className="button auth-provider-button provider-google"
        disabled={isLoading}
        type="button"
      >
        <GoogleOutlined />
        Continue with Google
      </button>
      <button
        className="button auth-provider-button provider-github"
        disabled={isLoading}
        type="button"
      >
        <GithubFilled />
        Continue with GitHub
      </button>
    </div>
  );
};

export default SocialLogin;
