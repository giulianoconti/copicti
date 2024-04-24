import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { IsLoading } from "src/components";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import { Painting } from "src/utils/types";
import { useNavigateParams } from "src/utils/hooks/useNavigateParams";
import { ErrorComponent } from "src/components";
import "./styles.css";

const Products = () => {
  const [data, setData] = useState<{ totalPages: number; currentPage: number; paintings: Painting[] }>({
    totalPages: 0,
    currentPage: 0,
    paintings: [],
  });
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const { width } = useWindowSize();
  const [searchParams] = useSearchParams();
  const categoriesParams = searchParams.get("categories");
  const pageParams = Number(searchParams.get("page")) || 1;
  const navigateWithParams = useNavigateParams();

  useEffect(() => {
    if (width >= 768) {
      setShowFilters(true);
    }
  }, [width]);

  useEffect(() => {
    const getProducts = async (retryCount = 0) => {
      setIsLoadingItems(true);
      try {
        let url = `${import.meta.env.VITE_SERVER_URL}/paintings`;
        if (categoriesParams) {
          url += `?categories=${categoriesParams}`;
          if (pageParams) {
            url += `&page=${pageParams}`;
          }
        } else if (pageParams) {
          url += `?page=${pageParams}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
        setIsLoadingItems(false);
      } catch (error) {
        if (retryCount < 1) {
          setTimeout(() => getProducts(retryCount + 1), 3000);
        } else {
          setError(error);
          setIsLoadingItems(false);
        }
      }
    };

    getProducts();
  }, [categoriesParams, pageParams]);

  const handlePage = (pageNumber: number) => {
    if (pageNumber === pageParams) return;
    window.scrollTo(0, 0);
    navigateWithParams({ page: pageNumber.toString() });
  };

  const handleShowFilters = () => {
    if (width < 768) {
      setShowFilters(!showFilters);
    }
  };

  const CheckFilters = ({ disabled = false, filterName }: { disabled?: boolean; filterName: string }) => {
    const handleFiltersSelected = () => {
      const selected = categoriesParams?.split(",") || [];
      const index = selected.indexOf(filterName);
      if (index === -1) {
        selected.push(filterName);
      } else {
        selected.splice(index, 1);
      }

      navigateWithParams({ page: "1", categories: selected.join(",") });
    };

    return (
      <div className="products-filter-container-type-select">
        <input
          checked={categoriesParams?.split(",").includes(filterName)}
          disabled={disabled}
          id={filterName}
          name={filterName}
          onChange={disabled ? null : handleFiltersSelected}
          type="checkbox"
        />
        <label htmlFor={filterName}>{filterName.replace(/([A-Z])/g, " $1").toUpperCase()}</label>
      </div>
    );
  };

  const Pagination = () =>
    data?.paintings?.length > 0 && (
      <div className="products-page-container">
        <PageButton disabled={pageParams <= 1} onClick={() => handlePage(1)}>
          &lt; &lt;
        </PageButton>
        <PageButton disabled={pageParams <= 1} onClick={() => handlePage(pageParams - 1)}>
          &lt;
        </PageButton>
        {[...Array(5)].map((_, i) => {
          const pageNumber = pageParams < 3 ? i + 1 : pageParams - 2 + i;
          const isDisabled = pageNumber < 1 || pageNumber > data?.totalPages;

          return (
            <PageButton
              key={i}
              active={pageNumber === pageParams}
              disabled={isDisabled}
              onClick={() => {
                handlePage(pageNumber);
              }}
            >
              {pageNumber}
            </PageButton>
          );
        })}
        <PageButton disabled={pageParams >= data?.totalPages} onClick={() => handlePage(pageParams + 1)}>
          &gt;
        </PageButton>
      </div>
    );

  return (
    <div className="products">
      <h1 className="products-title">Products</h1>

      <div className="products-container">
        <div className="products-filter">
          <h2 className="products-filter-title" onClick={handleShowFilters}>
            FILTER BY:
            <span className={showFilters ? "showFilters" : ""}>
              <CaretDownIcon height={20} width={20} />
            </span>
          </h2>

          <div className={`products-filter-container ${showFilters ? "" : "hidden"}`}>
            <div className="products-filter-container-type">
              <h3>BROWSE ART</h3>

              <CheckFilters filterName="paintings" />
              <CheckFilters filterName="prints" />
              <CheckFilters filterName="onSale" />
              <CheckFilters filterName="newArrivals" />
              <CheckFilters filterName="popular" />
            </div>

            <div className="products-filter-container-type">
              <h3>BY SUBJECT</h3>

              <CheckFilters filterName="abstract" />
              <CheckFilters filterName="landscape" />
              <CheckFilters filterName="nature" />
              <CheckFilters filterName="people" />
              <CheckFilters filterName="animals" />
            </div>

            <div className="products-filter-container-type disabled">
              <h3>BY SHAPE</h3>

              <CheckFilters disabled={true} filterName="polyptych" />
              <CheckFilters disabled={true} filterName="polyptychSh" />
              <CheckFilters disabled={true} filterName="triptych" />
              <CheckFilters disabled={true} filterName="triptychSquare" />
              <CheckFilters disabled={true} filterName="triptychCircle" />
            </div>

            <div className="products-filter-container-type disabled">
              <h3>BY SIZE (CM)</h3>

              <CheckFilters disabled={true} filterName="exLarge" />
              <CheckFilters disabled={true} filterName="large" />
              <CheckFilters disabled={true} filterName="medium" />
              <CheckFilters disabled={true} filterName="small" />
              <CheckFilters disabled={true} filterName="multiPanel" />
            </div>
          </div>
        </div>

        <div className="products-items">
          <Pagination />

          {isLoadingItems /* || true */ ? (
            <IsLoading />
          ) : error ? (
            <ErrorComponent />
          ) : (
            data?.paintings?.map((product, i) => {
              return (
                <Link className="products-item" to={`/product/${product._id}`} key={product._id}>
                  <div className="products-item-img">
                    <img src={product.image} alt={"product " + product._id} />
                  </div>
                  <h3 className="products-item-name">{product.name}</h3>
                  <h5 className="products-item-price">${product.price}</h5>
                </Link>
              );
            })
          )}

          <Pagination />
        </div>
      </div>
    </div>
  );
};

const PageButton = ({
  active = false,
  children,
  disabled,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}) => (
  <button className={`products-page-btn ${active ? "active" : ""}`} disabled={disabled} onClick={onClick}>
    {children}
  </button>
);

export default Products;
