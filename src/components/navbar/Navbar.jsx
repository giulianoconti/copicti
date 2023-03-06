import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import logo from "/copictiLogo.png";
import "./Navbar.css";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName.slice(0, 3));
      } else {
        setUsername("");
      }
    });
  }, []);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <img className="navbar__logo-img" src={logo} alt="logo" />
          <h2 className="navbar__logo-text">COPICTI</h2>
        </Link>
        <div className="navbar__menu">
          <ul className="navbar__menu-list">
            <li className="navbar__menu-item">
              <NavLink to="/" end className="navbar__menu-link">
                Home
              </NavLink>
            </li>
            <li className="navbar__menu-item">
              <NavLink to="/products" className="navbar__menu-link">
                Products
              </NavLink>
            </li>
            <li className="navbar__menu-item">
              <NavLink to="/create-picture" className="navbar__menu-link">
                Create Picture
              </NavLink>
            </li>
            <li className="navbar__menu-item">
              <NavLink to="/contact" className="navbar__menu-link">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar__icons">
          <NavLink to="/my-cart" className="navbar__icon" onClick={() => setShowMenu(false)}>
            <i className="fas">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
              </svg>
            </i>
          </NavLink>
          <NavLink to="/login" className="navbar__icon" onClick={() => setShowMenu(false)}>
            <i className="fas">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </i>
            {username && <span className="navbar__username">{username}</span>}
          </NavLink>
        </div>
        <div className="navbar__menu-icon" onClick={handleMenu}>
          <i className="fas">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </i>
        </div>
      </div>
      <div className={`navbar__menu-mobile ${showMenu ? "navbar__show-menu-mobile" : "navbar__hidden-menu-mobile"}`}>
        <ul className="navbar__menu-list">
          <li className="navbar__menu-item">
            <NavLink to="/" end className="navbar__menu-link" onClick={handleMenu}>
              Home
            </NavLink>
          </li>
          <li className="navbar__menu-item">
            <NavLink to="/products" className="navbar__menu-link" onClick={handleMenu}>
              Products
            </NavLink>
          </li>
          <li className="navbar__menu-item">
            <NavLink to="/create-picture" className="navbar__menu-link" onClick={handleMenu}>
              Create Picture
            </NavLink>
          </li>
          <li className="navbar__menu-item">
            <NavLink to="/contact" className="navbar__menu-link" onClick={handleMenu}>
              Contact
            </NavLink>
          </li>
          <li className="navbar__menu-item-myname">
            Made by:
            <a className="navbar__menu-link-myname" target="_blank" href="https://www.linkedin.com/in/giulianoconti/" rel="noreferrer">
              Giuliano Conti
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
