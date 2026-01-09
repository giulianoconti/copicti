import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useAuth } from "src/context/authContext";
import logo from "/copictiLogo.svg";
import "./styles.css";

const Navbar = () => {
  const { order, userInfo } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  // Get first 3 characters of display name from auth context
  const username = userInfo?.displayName?.slice(0, 3) || "";

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img className="navbar-logo-img" src={logo} alt="logo" />
          <h2 className="navbar-logo-text">COPICTI</h2>
        </Link>

        <div className="navbar-menu">
          <ul className="navbar-menu-list">
            <li className="navbar-menu-item">
              <NavLink to="/" end className="navbar-menu-link">
                Home
              </NavLink>
            </li>
            <li className="navbar-menu-item">
              <NavLink to="/products" className="navbar-menu-link">
                Products
              </NavLink>
            </li>
            <li className="navbar-menu-item">
              <NavLink to="/create-picture" className="navbar-menu-link">
                Create Picture
              </NavLink>
            </li>
            <li className="navbar-menu-item">
              <NavLink to="/contact" className="navbar-menu-link">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-menu">
          <ul className="navbar-menu-list">
            <li className="navbar-menu-item">
              <NavLink to="/my-cart" className="navbar-menu-link" onClick={() => setShowMenu(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" />
                </svg>

                <span>({!!order ? order.length : 0})</span>
              </NavLink>
            </li>
            <li className="navbar-menu-item">
              <NavLink to="/login" className="navbar-menu-link username" onClick={() => setShowMenu(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                  <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                </svg>

                {username && <span>{username}</span>}
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-menu-icon" onClick={handleMenu}>
          {showMenu ? <Cross1Icon color="#fff" height={24} width={24} /> : <HamburgerMenuIcon color="#fff" height={24} width={24} />}
        </div>
      </div>

      <div className={`navbar-menu-mobile ${showMenu ? "navbar-show-menu-mobile" : ""}`}>
        <ul className="navbar-menu-list">
          <li className="navbar-menu-item">
            <NavLink to="/" end className="navbar-menu-link" onClick={handleMenu}>
              Home
            </NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink to="/products" className="navbar-menu-link" onClick={handleMenu}>
              Products
            </NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink to="/create-picture" className="navbar-menu-link" onClick={handleMenu}>
              Create Picture
            </NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink to="/contact" className="navbar-menu-link" onClick={handleMenu}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
