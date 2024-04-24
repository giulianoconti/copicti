import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import "./styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3>Customer Service</h3>
        <p>Help & Contact</p>
        <p>Shipping & Taxes</p>
        <p>Return Policy</p>
        <p>FAQ</p>
      </div>

      <div className="footer-container">
        <h3>Company</h3>
        <p>About Us</p>
        <p>Press</p>
        <p>Blog</p>
        <p>Terms & Conditions</p>
      </div>

      <div className="footer-container">
        <div className="footer-container-social">
          <a href="https://github.com/giulianoconti" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubLogoIcon height={20} width={20} />
          </a>
          <a href="https://www.instagram.com/giulianocontii" target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramLogoIcon height={20} width={20} />
          </a>
          <a href="https://www.linkedin.com/in/giulianoconti" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInLogoIcon height={20} width={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
