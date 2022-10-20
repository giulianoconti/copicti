import React from "react";
import { Link } from "react-router-dom";
import "./HomeView.css";

export const HomeView = () => {
  return (
    <div className="home-screen">
      <div className="home-container">
        <Link className="home-frame" to="/products/all">
          <h3 className="home-frame-title">PRODUCTS</h3>
          <img
            className="home-img"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/71829/mona-lisa.jpg"
            alt="Mona Lisa"
          />
        </Link>
        <Link className="home-frame" to="/create-picture">
          <h3 className="home-frame-title">CREATE YOUR PICTURE FRAME</h3>
          <img
            className="home-img"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/71829/mona-lisa.jpg"
            alt="Mona Lisa"
          />
        </Link>
        <Link className="home-frame" to="/contact">
          <h3 className="home-frame-title">CONTACT</h3>
          <img
            className="home-img"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/71829/mona-lisa.jpg"
            alt="Mona Lisa"
          />
        </Link>
      </div>
    </div>
  );
};
