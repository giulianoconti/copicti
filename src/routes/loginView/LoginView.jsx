import React from "react";
import { useAuth } from "../../context/authContext";
import googleIcon from "../../assets/googleIcon.svg";
import { IsLoading } from "../../components/isLoading/IsLoading";
import "./LoginView.css";
import "../../stylesGlobal.css";

export const LoginView = () => {
  const { loginWithGoogle, userInfo, logout, loadingUser } = useAuth();

  if (loadingUser)
    return (
      <div className="login-screen">
        <div className="login-container">
          <IsLoading />
        </div>
      </div>
    );

  if (userInfo) {
    return (
      <div className="login-screen">
        <div className="login-container">
          <img className="login-user-img" src={userInfo.photoURL} alt="user" referrerPolicy="no-referrer" />
          <h2 className="login-user-name">{userInfo.displayName}</h2>
          <p className="login-user-email">{userInfo.email}</p>
          <button className="login-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    );
  } else
    return (
      <div className="login-screen">
        <div className="login-container">
          <h3 className="login-alert-text">You need to be registered to use some functions</h3>
          <button className="login-btn-google" onClick={loginWithGoogle}>
            <img className="login-btn-icon" src={googleIcon} alt="google icon" />
            Login with Google
          </button>
        </div>
      </div>
    );
};
