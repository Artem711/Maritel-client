import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useMutation, useSubscription, useQuery } from "react-apollo";
import { useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { addProductMutation } from "../../helpers/gqlMutation";
import { ProductCard, ProductsPageSettings } from "../Products";
import { LoadSpinner } from "../Spinners";
import "./ProductsPage.scss";
import { productsQuery, getProductsUuID } from "../../helpers/gqlQueries";
import {
  cloneObject,
  getTitle,
  sortBy,
  productsPerPage,
  page,
  defaultSortBy,
  defaultPerPage,
  defaultPage,
  debounce,
  searchQuery,
  countPages,
} from "../../helpers";
import { filterProducts } from "../../helpers/filterProducts";
import { Pagination } from "../Pagination";

export const ProductsPage = () => {
  const { data, loading } = useSubscription(productsQuery);
  const { checked, clearAllChecked, categories, colors } = useContext(
    AppContext
  );
  const [addCloneProducts] = useMutation(addProductMutation);

  const products: Products[] = useMemo(() => {
    if (data && data.products) {
      return data.products;
    } else {
      return [];
    }
  }, [data]);

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productsUuid = useQuery(getProductsUuID);
  const [filterInput, setFilterInput] = useState("");
  const [
    sortByParam,
    currentPerPage,
    currentPage,
    currentQuery,
  ] = useMemo(
    () => [
      searchParams.get(sortBy),
      searchParams.get(productsPerPage),
      searchParams.get(page),
      searchParams.get(searchQuery),
    ],
    [searchParams]
  );

  useEffect(() => {
    if (currentQuery !== filterInput) {
      setFilterInput(currentQuery || "");
    }
    // eslint-disable-next-line
  }, [currentQuery]);

  useEffect(() => {
    if (!sortByParam && !currentPage && !currentPerPage) {
      searchParams.set(sortBy, defaultSortBy);
      searchParams.set(productsPerPage, defaultPerPage);
      searchParams.set(page, defaultPage);

      history.push({
        search: searchParams.toString(),
      });
    }
  }, [searchParams, currentPage, currentPerPage, history, sortByParam]);

  const cloneChecked = () => {
    if (!checked.length) {
      return;
    }

    const toClone = products.filter((product) =>
      checked.some((check) => check === product.uuid)
    );

    toClone.forEach(async (clone) => {
      let newTitle = getTitle(clone.title);

      await addCloneProducts({
        variables: cloneObject(
          clone,
          newTitle,
          productsUuid.data.products.map((prod: { uuid: string }) => prod.uuid)
        ),
      });
    });

    clearAllChecked();
  };

  const singleClone = async (id: string) => {
    const clone = products.find((prod) => id === prod.uuid);
    if (clone) {
      let newTitle = getTitle(clone.title);

      await addCloneProducts({
        variables: cloneObject(
          clone,
          newTitle,
          productsUuid.data.products.map((prod: { uuid: string }) => prod.uuid)
        ),
      });
    }
  };

  const filteredProducts = useMemo(
    () =>
      filterProducts(
        sortByParam as string,
        defaultSortBy,
        products,
        currentQuery || "",
        categories,
        colors
      ),
    [sortByParam, products, currentQuery, categories, colors]
  );

  const pagesCount = useMemo(
    () => countPages(currentPerPage || defaultPerPage, filteredProducts),
    [filteredProducts, currentPerPage]
  );

  const visibleProducts = useMemo(() => {
    const page = currentPage || 1;
    const perPage = currentPerPage || 10;
    if (currentPerPage && +currentPerPage <= 0) {
      searchParams.set(productsPerPage, defaultPerPage);

      history.push({
        search: searchParams.toString(),
      });

      return filteredProducts.slice(
        (+page - 1) * +defaultPerPage,
        +defaultPerPage * +page
      );
    }

    return filteredProducts.slice((+page - 1) * +perPage, +perPage * +page);
  }, [filteredProducts, currentPage, currentPerPage, history, searchParams]);

  const setQueryToUrl = (query: string) => {
    if (!query) {
      searchParams.delete(searchQuery);
    } else {
      searchParams.set(searchQuery, query);
    }
    history.push({
      search: searchParams.toString(),
    });
  };

  const startDebounce = (value: string) => {
    debounceWrapper(value);
    setFilterInput(value);
  };

  const debounceWrapper = useCallback(
    debounce((query: string) => setQueryToUrl(query), 500),
    []
  );

  return (
    <>
      <div className="ProductsPage Pages__Wrap">
        <label>
          <input
            type="text"
            className="ProductsPage__Filter"
            placeholder="Поиск по товарам"
            onChange={(e) => startDebounce(e.target.value)}
            value={filterInput}
          />
        </label>

        <h1 className="Pages__Title">Товары</h1>
        <ProductsPageSettings
          sortBy={sortBy}
          productsPerPage={productsPerPage}
          cloneChecked={cloneChecked}
          products={visibleProducts}
        />
        {loading && (
          <div className="Spinner">
            <LoadSpinner />
          </div>
        )}
        {!loading &&
          visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              type={product.type}
              price={product.price}
              lastPrice={product.lastPrice}
              previewPhoto={product.previewPhoto}
              descr={product.descr}
              modelParam={product.modelParam}
              composition={product.composition}
              sizes={product.sizes}
              photos={product.photos}
              color={product.color}
              uuid={product.uuid}
              singleClone={singleClone}
            />
          ))}
        {visibleProducts.length === 0 && (
          <p className="ProductsPage__NoProducts">
            {loading ? "Загрузка..." : "Нет товаров."}
          </p>
        )}
        {currentPage && currentPerPage && sortByParam && (
          <Pagination
            qty={pagesCount}
            visible={filteredProducts.length > +currentPerPage}
          />
        )}
      </div>
    </>
  );
};
