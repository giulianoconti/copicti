import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "src/context/authContext";
import { getUserOrders, postUserOrder } from "src/firebase/firebase";
import { Painting } from "src/utils/types";
import "./styles.css";
import { ErrorComponent, IsLoading } from "src/components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Painting>({
    _id: 0,
    name: "",
    description: "",
    image: "",
    date: "",
    price: 0,
    categories: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { loginWithGoogle, userInfo, setOrder } = useAuth();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/paintings/${id}`);
      const data = await response.json();
      setProduct(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  const addToCart = async () => {
    if (userInfo) {
      setIsAddingToCart(true);
      await postUserOrder({ email: userInfo.email, order: product });
      const updatedOrders = await getUserOrders(userInfo.email);
      setOrder(updatedOrders);
      setIsAddingToCart(false);
    } else {
      loginWithGoogle();
    }
  };

  return (
    <div className="product">
      <h1 className="product-title">ProductView</h1>
      <div className="product-container">
        {isLoading ? (
          <IsLoading />
        ) : error ? (
          <ErrorComponent />
        ) : (
          <div className="product-container-info">
            <div>
              <img
                className="product-container-info-img"
                style={{
                  viewTransitionName: `product-image-${product._id}`,
                }}
                src={product.image}
                alt={product.name}
              />

              <div>
                <h2 className="product-container-info-name">{product.name}</h2>
                <p className="product-container-info-description">{product.description}</p>
                <p className="product-container-info-price">${product.price}</p>
              </div>
            </div>

            {isAddingToCart ? (
              <button className="product-container-btn" disabled>
                ADDING
                <span className="loader-dots" />
              </button>
            ) : (
              <button className="product-container-btn" onClick={addToCart}>
                ADD TO CART
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
