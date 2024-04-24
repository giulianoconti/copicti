import ErrorImage from "./error.svg";
import "./styles.css";

const ErrorComponent = () => {
  return (
    <div className="error">
      <img src={ErrorImage} alt="Error" />
      <h1>Oops! Something went wrong</h1>
    </div>
  );
};

export default ErrorComponent;
