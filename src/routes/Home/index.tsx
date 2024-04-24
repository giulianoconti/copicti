import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel1 from "src/assets/home/carousel-1.webp";
import Carousel2 from "src/assets/home/carousel-2.webp";
import Carousel3 from "src/assets/home/carousel-3.webp";
import Carousel1Desktop from "src/assets/home/carousel-1-desktop.webp";
import Carousel2Desktop from "src/assets/home/carousel-2-desktop.webp";
import Carousel3Desktop from "src/assets/home/carousel-3-desktop.webp";
import IconFree from "src/assets/icon-free.png";
import IconTransaction from "src/assets/icon-transaction.png";
import landscapeImage from "src/assets/home/landscape.jpg";
import animalsImage from "src/assets/home/animals.jpg";
import Abstract1Image from "src/assets/home/bestSellers/abstract-1.jpg";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import "./styles.css";

const Home = () => {
  const { width } = useWindowSize();
  const [top8BestSellers, settop8BestSellers] = useState([]);

  const getBestSellers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/paintings?categories=popular&page=1`);
      const data = await response.json();
      settop8BestSellers(data.paintings.slice(0, 8));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBestSellers();
  }, []);

  return (
    <div className="home">
      <Carousel autoPlay={true} emulateTouch={true} infiniteLoop={true} interval={5000} showStatus={false} showThumbs={false}>
        <img src={width <= 1024 ? Carousel1 : Carousel1Desktop} />

        <img src={width <= 1024 ? Carousel2 : Carousel2Desktop} />

        <img src={width <= 1024 ? Carousel3 : Carousel3Desktop} />
      </Carousel>

      <div className="home-container">
        <div className="home-container-delivery">
          <div className="home-container-delivery-item">
            <img src={IconFree} alt="free icon" />
            <p>Delivery OompaLoompa Wide</p>
          </div>
          <div className="home-container-delivery-item">
            <img src={IconTransaction} alt="transaction icon" />
            <p>7 Days Return Policy</p>
          </div>
        </div>

        <div className="home-container-popular">
          <h2>Shop Popular Categories</h2>

          <Link to="/products?page=1&categories=abstract" className="home-container-popular-item">
            <img src={Abstract1Image} alt="abstract" />
            <h3>Abstract</h3>
          </Link>

          <Link to="/products?page=1&categories=animals" className="home-container-popular-item">
            <img src={animalsImage} alt="animals" />
            <h3>Animals</h3>
          </Link>

          <Link to="/products?page=1&categories=landscape" className="home-container-popular-item">
            <img src={landscapeImage} alt="landscape" />
            <h3>Landscape</h3>
          </Link>
        </div>

        <div className="home-container-best-sellers">
          <h2>Best Sellers</h2>

          {top8BestSellers.length > 0 &&
            top8BestSellers.map((painting) => (
              <Link key={painting._id} to={`/product/${painting._id}`} className="home-container-best-sellers-item">
                <div className="home-container-best-sellers-item-img">
                  <img src={painting.image} />
                </div>
                <div className="home-container-best-sellers-item-container">
                  <h3>{painting.name}</h3>
                  <h4>${painting.price}</h4>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
