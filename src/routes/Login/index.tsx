import { useAuth } from "src/context/authContext";
import googleIcon from "src/assets/googleIcon.svg";
import { IsLoading } from "src/components";
import "./styles.css";
import "src/stylesGlobal.css";

const LoginView = () => {
  const { loginWithGoogle, userInfo, logout, loadingUser } = useAuth();

  if (loadingUser)
    return (
      <div className="login">
        <div className="login-container">
          <IsLoading />
        </div>
      </div>
    );

  if (userInfo) {
    return (
      <div className="login">
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
      <div className="login">
        <div className="login-container">
          <h3 className="login-alert-text">Registering will allow you to contact us directly and add items to your shopping cart with ease.</h3>
          <button className="login-btn-google" onClick={loginWithGoogle}>
            <img className="login-btn-icon" src={googleIcon} alt="google icon" />
            Login with Google
          </button>
        </div>
      </div>
    );
};

export default LoginView;
