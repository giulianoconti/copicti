import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts, postUserOrder } from "../../firebase/firebase";
import { IsLoading } from "../../components/isLoading/IsLoading";
import { useAuth } from "../../context/authContext";
import arrowLeft from "../../assets/arrow-left.svg";
import arrowRight from "../../assets/arrow-right.svg";
import "./ProductsView.css";

export const ProductsView = () => {
  const { products_id } = useParams();
  const { loginWithGoogle, userInfo } = useAuth();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [openProduct, setOpenProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    getProductsFromFirebase();
  }, []);

  useEffect(() => {
    setIsLoadingItems(true);
    getProductsFromFirebase();
  }, [products_id]);

  const getProductsFromFirebase = async () => {
    const productsFromFirebase = await getProducts(products_id);
    setProducts(productsFromFirebase);
    setIsLoadingPage(false);
    setIsLoadingItems(false);
  };

  const addToCart = async () => {
    if (userInfo) {
      await postUserOrder({ email: userInfo.email, order: openProduct });
      setOpenProduct({
        id: "",
        name: "",
        description: "",
        price: "",
        image: "",
      });
      alert("Product added to cart");
    } else {
      loginWithGoogle();
    }
  };

  const handlePage = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(pageNumber);
  };

  if (isLoadingPage) {
    return (
      <div className="products-screen">
        <div className="products-container align-center">
          <IsLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="products-screen">
      <div className="products-container">
        {/* <button onClick={cargarProduct}>TEST</button> */}
        <div className="products-filter">
          <h2 className="products-filter-sort">Filter by:</h2>
          <Link
            className={`products-filter-frame ${products_id === "all" ? "products-filter-active" : ""}`}
            to="/products/all"
          >
            <h3 className="products-filter-title">All</h3>
            <div className="products-filter-frame-grid">
              <div className="products-filter-frame-divisor">
                <div className="products-filter-pic-s" />
                <div className="products-filter-pic-m" />
                <div className="products-filter-pic-l" />
                <div className="products-filter-pic-m" />
                <div className="products-filter-pic-s" />
              </div>
              <div className="products-filter-frame-divisor">
                <div className="products-filter-pic-l-thin" />
                <div className="products-filter-pic-l" />
                <div className="products-filter-pic-l-thin" />
                <div className="products-filter-pic-l" />
              </div>
              <div className="products-filter-frame-divisor">
                <div className="products-filter-pic-l" />
                <div className="products-filter-pic-l" />
                <div className="products-filter-pic-l" />
              </div>
              <div className="products-filter-frame-divisor">
                <div className="products-filter-pic-square-l" />
                <div className="products-filter-pic-square-l" />
                <div className="products-filter-pic-square-l" />
              </div>
              <div className="products-filter-frame-divisor">
                <div className="products-filter-pic-circle-l" />
                <div className="products-filter-pic-circle-l" />
                <div className="products-filter-pic-circle-l" />
              </div>
            </div>
          </Link>
          <Link
            className={`products-filter-frame ${products_id === "AA" ? "products-filter-active" : ""}`}
            to="/products/AA"
          >
            <h3 className="products-filter-title">Polyptych</h3>
            <div className="products-filter-pic-s" />
            <div className="products-filter-pic-m" />
            <div className="products-filter-pic-l" />
            <div className="products-filter-pic-m" />
            <div className="products-filter-pic-s" />
          </Link>
          <Link
            className={`products-filter-frame ${products_id === "AB" ? "products-filter-active" : ""}`}
            to="/products/AB"
          >
            <h3 className="products-filter-title">
              Polyptych <span className="products-filter-span">SH</span>
            </h3>
            <div className="products-filter-pic-l-thin" />
            <div className="products-filter-pic-l" />
            <div className="products-filter-pic-l-thin" />
            <div className="products-filter-pic-l" />
          </Link>
          <Link
            className={`products-filter-frame ${products_id === "AC" ? "products-filter-active" : ""}`}
            to="/products/AC"
          >
            <h3 className="products-filter-title">Triptych</h3>
            <div className="products-filter-pic-l" />
            <div className="products-filter-pic-l" />
            <div className="products-filter-pic-l" />
          </Link>
          <Link
            className={`products-filter-frame ${products_id === "AD" ? "products-filter-active" : ""}`}
            to="/products/AD"
          >
            <h3 className="products-filter-title">
              Triptych <span className="products-filter-span">Square</span>
            </h3>
            <div className="products-filter-pic-square-l" />
            <div className="products-filter-pic-square-l" />
            <div className="products-filter-pic-square-l" />
          </Link>
          <Link
            className={`products-filter-frame ${products_id === "AE" ? "products-filter-active" : ""}`}
            to="/products/AE"
          >
            <h3 className="products-filter-title">
              Triptych <span className="products-filter-span">Circle</span>
            </h3>
            <div className="products-filter-pic-circle-l" />
            <div className="products-filter-pic-circle-l" />
            <div className="products-filter-pic-circle-l" />
          </Link>
        </div>
        <div className="products-items">
          {isLoadingItems ? (
            <IsLoading />
          ) : (
            products.map((product, i) => {
              if (!(i > page * 20 - 21 && i < page * 20 - 1)) return;
              return (
                <div className="products-item" onClick={() => setOpenProduct(product)} key={product.id}>
                  <img className="products-item-img" src={product.image} alt={"product " + product.id} />
                  <h3 className="products-item-name">{product.name}</h3>
                  <h5 className="products-item-price">${product.price}</h5>
                </div>
              );
            })
          )}
          {openProduct.id !== "" && (
            <div
              className="products-openProduct-container"
              onClick={({ target: { className } }) =>
                (className === "products-openProduct-container" || className === "products-openProduct-close") &&
                setOpenProduct({ id: "", name: "", description: "", price: "", image: "" })
              }
            >
              <div className="products-openProduct-items">
                <button className="products-openProduct-close">x</button>
                <img className="products-openProduct-img" src={openProduct.image} alt={"product " + openProduct.id} />
                <div className="products-openProduct-textContainer">
                  <h3 className="products-openProduct-name">{openProduct.name}</h3>
                  <h5 className="products-openProduct-price">${openProduct.price}</h5>
                  {openProduct.description.split(".").map((line, i) => (
                    <p className="products-openProduct-description" key={i}>
                      {line}
                    </p>
                  ))}
                </div>
                <button className="products-openProduct-btn" onClick={addToCart}>
                  Add to cart
                </button>
              </div>
            </div>
          )}

          <div className="products-page-container">
            {page > 1 && (
              <button
                className={`products-page-btn products-page-btn-arrows products-page-btn_-${page > 2 ? "3" : "2_5"}`}
                onClick={() => handlePage(page - 1)}
              >
                <img className="products-page-btn-img" src={arrowLeft} alt="left arrow" />
              </button>
            )}
            {page > 2 && (
              <button className="products-page-btn products-page-btn_-2" onClick={() => handlePage(page - 2)}>
                {page - 2}
              </button>
            )}
            {page > 1 && (
              <button className="products-page-btn products-page-btn_-1" onClick={() => handlePage(page - 1)}>
                {page - 1}
              </button>
            )}
            <button className="products-page-btn products-page-btn-active" onClick={() => handlePage(page)}>
              {page}
            </button>

            <button className="products-page-btn products-page-btn_1" onClick={() => handlePage(page + 1)}>
              {page + 1}
            </button>

            <button className="products-page-btn products-page-btn_2" onClick={() => handlePage(page + 2)}>
              {page + 2}
            </button>

            <button
              className="products-page-btn products-page-btn-arrows products-page-btn_3"
              onClick={() => handlePage(page + 1)}
            >
              <img className="products-page-btn-img" src={arrowRight} alt="right arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
