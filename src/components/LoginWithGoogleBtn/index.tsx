import { useAuth } from "src/context/authContext";
import googleIcon from "src/assets/googleIcon.svg";
import "./styles.css";

const LoginWithGoogleBtn = () => {
  const { loginWithGoogle, userInfo, loadingUser } = useAuth();

  return (
    <button className="login-btn-google" onClick={loginWithGoogle}>
      <img className="login-btn-icon" src={googleIcon} alt="google icon" />
      Login with Google
    </button>
  );
};

export default LoginWithGoogleBtn;
