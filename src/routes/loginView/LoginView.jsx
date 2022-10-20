import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./LoginView.css";

export const LoginView = () => {
  const [isLogged, setIsLogged] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
        setUserInfo(user);
      } else {
        setIsLogged(false);
      }
    });
  }, []);

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };

  const logout = () => {
    navigate("/");
    auth.signOut();
  };

  if (isLogged) {
    return (
      <div className="login-screen">
        <div className="login-container">
          <hr className="login-hr" />
          <img className="login-user-img" src={userInfo.photoURL} alt="user" referrerPolicy="no-referrer" />
          <h2 className="login-user-name">{userInfo.displayName}</h2>
          <p className="login-user-email">{userInfo.email}</p>
          <button className="login-btn" onClick={logout}>
            Logout
          </button>
          <hr className="login-hr" />
        </div>
      </div>
    );
  } else {
    loginWithGoogle();
  }
};
