import { Link } from "react-router-dom";
import { Painting } from "src/utils/types";
import "./styles.css";

interface ProductCardProps {
  painting: Painting;
  className?: string;
}

const ProductCard = ({ painting, className = "" }: ProductCardProps) => {
  return (
    <Link to={`/product/${painting._id}`} className={`product-card ${className}`}>
      <div className="product-card-img">
        <img src={painting.image} alt={painting.name} loading="lazy" />
      </div>
      <div className="product-card-info">
        <h3 className="product-card-name">{painting.name}</h3>
        <p className="product-card-price">${painting.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;

