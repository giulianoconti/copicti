import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IsLoading } from "../../components/isLoading/IsLoading";
/* import homePic from "/src/pictures/homePic.webp";
import homeFrame1 from "/src/pictures/homeFrame1.webp";
import homeFrame2 from "/src/pictures/homeFrame2.webp";
import homeFrame3 from "/src/pictures/homeFrame3.webp"; */
import "./HomeView.css";

export const HomeView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allImagesHome, setAllImagesHome] = useState({
    homePic: new Image(),
    homeFrame1: new Image(),
    homeFrame2: new Image(),
    homeFrame3: new Image(),
  });

  useEffect(() => {
    allImagesHome.homePic.src =
      "https://firebasestorage.googleapis.com/v0/b/copic-12fe1.appspot.com/o/picturesApp%2FhomePic.webp?alt=media&token=9e4a41a3-6d16-494d-9a2d-b4cf2b88f7a6";
    allImagesHome.homeFrame1.src =
      "https://firebasestorage.googleapis.com/v0/b/copic-12fe1.appspot.com/o/picturesApp%2FhomeFrame1.webp?alt=media&token=3e822b06-d0f7-4636-872b-41df3b5cd2ff";
    allImagesHome.homeFrame2.src =
      "https://firebasestorage.googleapis.com/v0/b/copic-12fe1.appspot.com/o/picturesApp%2FhomeFrame2.webp?alt=media&token=bc0f94bc-33e6-441d-8b43-099aecde68fd";
    allImagesHome.homeFrame3.src =
      "https://firebasestorage.googleapis.com/v0/b/copic-12fe1.appspot.com/o/picturesApp%2FhomeFrame3.webp?alt=media&token=a83c9a6b-93f6-4156-9d1a-5c82ba962fe2";
    allImagesHome.homeFrame2.onload = () => setIsLoading(false);
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
    <div className="home-screen" style={{ backgroundImage: `url(${allImagesHome.homePic.src})` }}>
      <div className="home-container">
        <Link className="home-frame" to="/products/all">
          <h3 className="home-frame-title">PRODUCTS</h3>
          <img className="home-img" src={allImagesHome.homeFrame1.src} alt="Frame 1" />
        </Link>
        <Link className="home-frame" to="/create-picture">
          <h3 className="home-frame-title">CREATE YOUR PICTURE FRAME</h3>
          <img className="home-img" src={allImagesHome.homeFrame2.src} alt="Frame 2" />
        </Link>
        <Link className="home-frame" to="/contact">
          <h3 className="home-frame-title">CONTACT</h3>
          <img className="home-img" src={allImagesHome.homeFrame3.src} alt="Frame 3" />
        </Link>
      </div>
    </div>
  );
};
