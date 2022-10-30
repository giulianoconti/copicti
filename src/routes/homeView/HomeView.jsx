import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IsLoading } from "../../components/isLoading/IsLoading";
import homePic from "../../assets/homePic.webp";
import homeFrame1 from "../../assets/homeFrame1.webp";
import homeFrame2 from "../../assets/homeFrame2.webp";
import homeFrame3 from "../../assets/homeFrame3.webp";
import "./HomeView.css";

export const HomeView = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHomePic = new Image();
    loadHomePic.src = homePic;
    const loadHomeFrame1 = new Image();
    loadHomeFrame1.src = homeFrame1;
    const loadHomeFrame2 = new Image();
    loadHomeFrame2.src = homeFrame2;
    const loadHomeFrame3 = new Image();
    loadHomeFrame3.src = homeFrame3;
    loadHomeFrame2.onload = () => {
      setIsLoading(false);
    }
  }, []);

  if (isLoading)
    return (
      <div className="home-screen">
        <div className="home-container">
          <IsLoading />
        </div>
      </div>
    );

  return (
    <div className="home-screen" style={{ backgroundImage: `url(${homePic})` }}>
      <div className="home-container">
        <Link className="home-frame" to="/products/all">
          <h3 className="home-frame-title">PRODUCTS</h3>
          <img className="home-img" src={homeFrame1} alt="Frame 1" />
        </Link>
        <Link className="home-frame" to="/create-picture">
          <h3 className="home-frame-title">CREATE YOUR PICTURE FRAME</h3>
          <img className="home-img" src={homeFrame2} alt="Frame 2" />
        </Link>
        <Link className="home-frame" to="/contact">
          <h3 className="home-frame-title">CONTACT</h3>
          <img className="home-img" src={homeFrame3} alt="Frame 3" />
        </Link>
      </div>
    </div>
  );
};
