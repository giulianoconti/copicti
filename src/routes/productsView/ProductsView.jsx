import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
/* import arrowLeft from "../../pictures/arrow-left.svg";
import arrowRight from "../../pictures/arrow-right.svg"; */
import { getProducts, postProducts } from "../../firebase/firebase";
import { IsLoading } from "../../components/isLoading/IsLoading";
import "./ProductsView.css";

export const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const { products_id } = useParams();

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

  /* const cargarProduct = () => {
    postProducts({
      description: "lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet",
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_766168-MLA48415601476_122021-F.webp",
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_2X_766168-MLA48415601476_122021-F.webp",
        "https://http2.mlstatic.com/D_NQ_NP_939414-MLA48383693854_112021-O.webp",
        "https://http2.mlstatic.com/D_NQ_NP_2X_766168-MLA48415601476_122021-F.webp",
      ],
      name: "Product 22 x2x2x1",
      price: 220,
      type: "x2_small-x2_medium-x1_large",
    });
  }; */

  if (isLoadingPage) {
    return (
      <div className="products-screen">
        <div className="products-container">
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
            className={`products-filter-frame ${
              products_id === "x2_small-x2_medium-x1_large" ? "products-filter-active" : ""
            }`}
            to="/products/x2_small-x2_medium-x1_large"
          >
            <h3 className="products-filter-title">Polyptych</h3>
            <div className="products-filter-pic-s" />
            <div className="products-filter-pic-m" />
            <div className="products-filter-pic-l" />
            <div className="products-filter-pic-m" />
            <div className="products-filter-pic-s" />
          </Link>
          <Link
            className={`products-filter-frame ${products_id === "x2_medium-x2-large" ? "products-filter-active" : ""}`}
            to="/products/x2_medium-x2-large"
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
            className={`products-filter-frame ${products_id === "x3_same" ? "products-filter-active" : ""}`}
            to="/products/x3_same"
          >
            <h3 className="products-filter-title">Triptych</h3>
            <div className="products-filter-pic-l" />
            <div className="products-filter-pic-l" />
            <div className="products-filter-pic-l" />
          </Link>
          <Link
            className={`products-filter-frame ${products_id === "x3_square_same" ? "products-filter-active" : ""}`}
            to="/products/x3_square_same"
          >
            <h3 className="products-filter-title">
              Triptych <span className="products-filter-span">Square</span>
            </h3>
            <div className="products-filter-pic-square-l" />
            <div className="products-filter-pic-square-l" />
            <div className="products-filter-pic-square-l" />
          </Link>
          <Link
            className={`products-filter-frame ${products_id === "x3_circle_same" ? "products-filter-active" : ""}`}
            to="/products/x3_circle_same"
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
              if (i > 19) return;
              return (
                <div className="products-item" key={product.id}>
                  <img className="products-item-img" src={product.image} alt={"product " + product.id} />
                  <h3 className="products-item-name">{product.name}</h3>
                  <h5 className="products-item-price">${product.price}</h5>
                </div>
              );
            })
          )}
        </div>
        {/*  <div className="products-items">
          {filteredProduct.map((product) => (
            <div className="products-item" key={product.id}>
              <img className="products-item-img" src={product.image} alt={"product " + product.id} />
              <h3 className="products-item-title">
                {product.title} {product.id}
              </h3>
            </div>
          ))}

          {filterProduct === "all" && (
            <div className="products-page-container">
              {page > 1 && (
                <>
                  <button className="products-page-btn products-page-btn-arrows" onClick={() => setPage(page - 1)}>
                    <img className="products-page-btn-img" src={arrowLeft} alt="left arrow" />
                  </button>
                  {page > 2 && (
                    <button className="products-page-btn" onClick={() => setPage(page - 2)}>
                      {page - 2}
                    </button>
                  )}
                  <button className="products-page-btn" onClick={() => setPage(page - 1)}>
                    {page - 1}
                  </button>
                </>
              )}
              <button className="products-page-btn products-page-btn-active" onClick={() => setPage(page)}>
                {page}
              </button>
              {page * 20 < allProducts.length && (
                <>
                  <button className="products-page-btn" onClick={() => setPage(page + 1)}>
                    {page + 1}
                  </button>
                  {page * 20 + 20 < allProducts.length && (
                    <button className="products-page-btn" onClick={() => setPage(page + 2)}>
                      {page + 2}
                    </button>
                  )}
                  <button className="products-page-btn products-page-btn-arrows" onClick={() => setPage(page + 1)}>
                    <img className="products-page-btn-img" src={arrowRight} alt="right arrow" />
                  </button>
                </>
              )}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};
