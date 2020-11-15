import React, { useContext, useMemo } from "react";
import "./PopupDeleteProduct.scss";
import { AppContext } from "../../../context/appContext";
import { useMutation, useQuery } from "react-apollo";
import {
  deleteProductMutation,
  updateSpecCategMutation,
} from "../../../helpers/gqlMutation";
import {
  productsQuery,
  productQuery,
  getSpecCategQuery,
} from "../../../helpers/gqlQueries";
import { Link, useLocation, useHistory } from "react-router-dom";
import { sortBy } from "../../../helpers";

export const PopupDeleteProduct = () => {
  const location = useLocation();
  const history = useHistory();
  const isProductPage = location.pathname.includes("/products");
  const {
    setBackgroundCover,
    deletePopupOpen,
    currentId,
    checked,
    specCategs,
    clearAllChecked,
  } = useContext(AppContext);

  const [deleteProduct] = useMutation(deleteProductMutation);
  const [updateSpec] = useMutation(updateSpecCategMutation);
  const { data } = useQuery(productQuery, {
    variables: { uuid: currentId },
  });
  const spCa = useQuery(getSpecCategQuery);
  const products = useQuery(productsQuery);
  const searchParams = new URLSearchParams(location.pathname);
  const sortedBy = useMemo(() => searchParams.get(sortBy), [searchParams]);

  const handleDeleteProduct = async () => {
    await deleteProduct({
      variables: { uuid: currentId },
      refetchQueries: [{ query: productsQuery }],
    }).then(() => {
      deletePopupOpen(false, "");
    });
    if (data) {
      const specCategToDel = specCategs.find((categ) =>
        categ.products.some((pr) => pr === data.product.id)
      );

      if (specCategToDel) {
        await updateSpec({
          variables: {
            id: specCategToDel.id,
            name: specCategToDel.name,
            products: specCategToDel.products.filter(
              (pr) => pr !== data.product.id
            ),
          },
        });
      }
    }
  };

  const deleteChecked = () => {
    checked.forEach(async (check) => {
      await deleteProduct({
        variables: { uuid: check },
        refetchQueries: [{ query: productsQuery }],
      });
    });

    if (spCa && spCa.data && products && products.data) {
      const categories = spCa.data.getSpecCateg;
      const goods: Products[] = products.data.products;
      const ids = checked.map(
        (ch) => goods.find((prod) => prod.uuid === ch)?.id
      );
      const specCats: SpecProdsCategory[] = categories.map(
        (cat: SpecProdsCategory) => ({
          id: cat.id,
          name: cat.name,
          products: cat.products.filter((pr) => !ids.some((id) => id === pr)),
        })
      );

      specCats.forEach(async (categ) => {
        await updateSpec({
          variables: {
            id: categ.id,
            name: categ.name,
            products: categ.products,
          },
        });
      });
    }

    clearAllChecked();

    history.push({
      pathname: location.pathname,
      search: `?sortBy=${sortedBy || "Все товары"}&perPage=10&page=1`,
    });
  };

  return (
    <div className="Delete">
      <p className="Delete__Text">
        {checked.length === 0
          ? "Удалить товар?"
          : `Удалить товары? (${checked.length})`}
      </p>
      <div className="Delete__Buttons">
        {isProductPage && checked.length !== 0 && (
          <button
            className="Delete__Button Delete__Button--delete"
            onClick={() => {
              deleteChecked();
              setBackgroundCover(false);
            }}
          >
            Удалить
          </button>
        )}

        {isProductPage && checked.length === 0 && (
          <button
            className="Delete__Button Delete__Button--delete"
            onClick={() => {
              handleDeleteProduct();
              setBackgroundCover(false);
            }}
          >
            Удалить
          </button>
        )}

        {!isProductPage && (
          <Link
            to="/products?sortBy=Все+товары"
            className="Delete__Button Delete__Button--delete Delete__Button--link"
            onClick={() => {
              handleDeleteProduct();
              setBackgroundCover(false);
            }}
          >
            Удалить
          </Link>
        )}

        <button
          className="Delete__Button Delete__Button--cancel"
          onClick={() => {
            deletePopupOpen(false, "");
            setBackgroundCover(false);
          }}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};
