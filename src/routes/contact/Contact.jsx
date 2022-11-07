import React from "react";
import { IsLoading } from "../../components/isLoading/IsLoading";
import { useAuth } from "../../context/authContext";
import googleIcon from "../../assets/googleIcon.svg";
import "./Contact.css";

export const Contact = () => {
  const { loginWithGoogle, userInfo, loadingUser } = useAuth();

  if (loadingUser)
    return (
      <div className="contact-screen">
        <IsLoading />
      </div>
    );

  if (!userInfo) {
    loginWithGoogle();
    return (
      <div className="contact-screen">
        <button className="login-btn-google" onClick={loginWithGoogle}>
          <img className="login-btn-icon" src={googleIcon} alt="google icon" />
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className="contact-screen">
      <form className="contact-form">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-form-group">
          <label htmlFor="name">Name</label>
          <input className="contact-input" type="text" name="name" id="name" />
        </div>
        <div className="contact-form-group">
          <label htmlFor="email">Email</label>
          <input
            className="contact-input-disabled"
            type="email"
            name="email"
            id="email"
            disabled
            value={userInfo.email}
          />
        </div>
        <div className="contact-form-group">
          <label htmlFor="message">Message</label>
          <textarea className="contact-textarea" name="message" id="message" cols="30" rows="10"></textarea>
        </div>
        <button className="contact-btn-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
