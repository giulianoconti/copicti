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
import AbstractImage from "src/assets/home/abstract.jpg";
import animalsImage from "src/assets/home/animals.jpg";
import landscapeImage from "src/assets/home/landscape.jpg";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import { IsLoading, IsError, ProductCard } from "src/components";
import { Painting } from "src/utils/types";
import { api } from "src/services/api";
import "./styles.css";

const Home = () => {
  const { width } = useWindowSize();
  const [isLoading, setIsLoading] = useState(false);
  const [bestSellers, setBestSellers] = useState<Painting[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getBestSellers = async () => {
      try {
        setIsLoading(true);
        const data = await api.getPaintings({ categories: "popular", page: 1 });
        setBestSellers(data.paintings.slice(0, 8));
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getBestSellers();
  }, []);

  return (
    <div className="home">
      <Carousel autoPlay={true} emulateTouch={true} infiniteLoop={true} interval={5000} showStatus={false} showThumbs={false}>
        <img src={width <= 1024 ? Carousel1 : Carousel1Desktop} alt="Featured artwork collection" />

        <img src={width <= 1024 ? Carousel2 : Carousel2Desktop} alt="Handcrafted paintings" />

        <img src={width <= 1024 ? Carousel3 : Carousel3Desktop} alt="Custom art pieces" />
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
            <img src={AbstractImage} alt="abstract" />
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

          {isLoading ? (
            <IsLoading />
          ) : isError ? (
            <IsError />
          ) : (
            <div className="home-container-best-sellers-content">
              {bestSellers.map((painting) => (
                <ProductCard
                  key={painting._id}
                  painting={painting}
                  className="home-container-best-sellers-content-item"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
