import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { IsLoading, ErrorComponent, ProductCard } from "src/components";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import { useNavigateParams } from "src/utils/hooks/useNavigateParams";
import { api, PaintingsResponse } from "src/services/api";
import {
  BROWSE_ART_CATEGORIES,
  SUBJECT_CATEGORIES,
  SHAPE_CATEGORIES,
  SIZE_CATEGORIES,
  formatCategoryName,
} from "src/constants/categories";
import "./styles.css";

const Products = () => {
  const [data, setData] = useState<PaintingsResponse>({
    totalPages: 0,
    currentPage: 0,
    paintings: [],
  });
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [error, setError] = useState<Error | null>(null);
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
        const response = await api.getPaintings({
          categories: categoriesParams || undefined,
          page: pageParams,
        });
        setData(response);
        setError(null);
      } catch (err) {
        if (retryCount < 1) {
          setTimeout(() => getProducts(retryCount + 1), 3000);
        } else {
          setError(err as Error);
        }
      } finally {
        setIsLoadingItems(false);
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
          onChange={disabled ? undefined : handleFiltersSelected}
          type="checkbox"
        />
        <label htmlFor={filterName}>{formatCategoryName(filterName)}</label>
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
              {BROWSE_ART_CATEGORIES.map((category) => (
                <CheckFilters key={category} filterName={category} />
              ))}
            </div>

            <div className="products-filter-container-type">
              <h3>BY SUBJECT</h3>
              {SUBJECT_CATEGORIES.map((category) => (
                <CheckFilters key={category} filterName={category} />
              ))}
            </div>

            <div className="products-filter-container-type disabled">
              <h3>BY SHAPE</h3>
              {SHAPE_CATEGORIES.map((category) => (
                <CheckFilters key={category} filterName={category} disabled />
              ))}
            </div>

            <div className="products-filter-container-type disabled">
              <h3>BY SIZE (CM)</h3>
              {SIZE_CATEGORIES.map((category) => (
                <CheckFilters key={category} filterName={category} disabled />
              ))}
            </div>
          </div>
        </div>

        <div className="products-items">
          <Pagination />

          {isLoadingItems ? (
            <IsLoading />
          ) : error ? (
            <ErrorComponent />
          ) : (
            data.paintings.map((painting) => (
              <ProductCard
                key={painting._id}
                painting={painting}
                className="products-item"
              />
            ))
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
