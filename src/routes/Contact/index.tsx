import { IsLoading, LoginWithGoogleBtn } from "src/components";
import { useAuth } from "src/context/authContext";
import "./styles.css";

const Contact = () => {
  const { loginWithGoogle, userInfo, loadingUser } = useAuth();

  if (loadingUser)
    return (
      <div className="contact">
        <IsLoading />
      </div>
    );

  if (!userInfo) {
    loginWithGoogle();
    return (
      <div className="contact">
        <form className="contact-form">
          <h1 className="contact-title">Contact Us</h1>
          <div className="contact-form-group">
            <label htmlFor="name">Name</label>
            <input className="contact-input" type="text" name="name" id="name" disabled />
          </div>
          <div className="contact-form-group">
            <label htmlFor="email">Email</label>
            <input className="contact-input" type="email" name="email" id="email" disabled />
          </div>
          <div className="contact-form-group">
            <label htmlFor="message">Message</label>
            <textarea className="contact-textarea" name="message" id="message" cols={30} rows={10} disabled></textarea>
          </div>

          <div className="contact-form-google-container">
            <LoginWithGoogleBtn />
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="contact">
      <form className="contact-form">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-form-group">
          <label htmlFor="name">Name</label>
          <input className="contact-input" type="text" name="name" id="name" />
        </div>
        <div className="contact-form-group">
          <label htmlFor="email">Email</label>
          <input className="contact-input" type="email" name="email" id="email" disabled value={userInfo.email} />
        </div>
        <div className="contact-form-group">
          <label htmlFor="message">Message</label>
          <textarea className="contact-textarea" name="message" id="message" cols={30} rows={10}></textarea>
        </div>
        <button className="contact-btn-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
