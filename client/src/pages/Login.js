import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h1>Image Search App</h1>
      <div className="login-buttons">
        <a
          href="http://localhost:5050/auth/google"
          className="login-button google"
        >
          Login with Google
        </a>
        <a
          href="http://localhost:5050/auth/github"
          className="login-button github"
        >
          Login with GitHub
        </a>
      </div>
    </div>
  );
};

export default Login;
