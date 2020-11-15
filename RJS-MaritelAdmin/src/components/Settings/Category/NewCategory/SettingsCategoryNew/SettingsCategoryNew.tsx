import React, { useContext, useEffect, useState, useMemo } from "react";
import { useMutation, useQuery } from "react-apollo";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import { AppContext } from "../../../../../context/appContext";
import {
  addSpecCategMutation,
  deleteSpecCategMutation,
  updateSpecCategMutation,
} from "../../../../../helpers/gqlMutation";
import {
  getSpecCategQuery,
  productOptionCategoryQuery,
} from "../../../../../helpers/gqlQueries";
import { ProductsSelect } from "../../../../Products";
import { SettingsCategorySpecButtonsOld } from "../SettingsCategorySpecButtonsOld";
import { SettingsCategorySpecItem } from "../SettingsCategorySpecItem";
import "./SettingsCategoryNew.scss";
import cn from "classnames";
import { filterProductsWithoutQuery } from "../../../../../helpers/filterProducts";
import {
  defaultSortBy,
  sortCategory,
  status,
  defaultStatus,
} from "../../../../../helpers";

export const SettingsCategoryNew = () => {
  const { bachgroundCover, setBackgroundCover } = useContext(AppContext);
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams();
  const products = useQuery(productOptionCategoryQuery);
  const specCateg = useQuery(getSpecCategQuery);
  const [addSpecCateg] = useMutation(addSpecCategMutation);
  const [updateSpecCateg] = useMutation(updateSpecCategMutation);
  const [removeSpecCateg] = useMutation(deleteSpecCategMutation);

  const isNewCategory = !location.pathname.startsWith(
    "/settings/category/editSpec/"
  );
  const editingId = !isNewCategory
    ? location.pathname.split("/settings/category/editSpec/")[1]
    : "";

  const { categories } = useContext(AppContext);
  const [editingCategory, setEditingCategory] = useState<SpecProdsCategory>();
  const [prods, setProds] = useState<ProductsCategory[]>([]);
  const [categName, setCategName] = useState("");
  const [checkedProds, setCheckedProds] = useState<string[]>([]);
  const [cancel, setCancel] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [visible, setVisible] = useState<VisibleProds>("Все");
  const [sortBy, setSortBy] = useState(defaultSortBy);

  const getStatus = useMemo(() => searchParams.get(status), [searchParams]);
  const getSearchCategory = useMemo(() => searchParams.get(sortCategory), [
    searchParams,
  ]);

  useEffect(() => {
    if (!getStatus && !getSearchCategory) {
      searchParams.set(status, defaultStatus);
      searchParams.set(sortCategory, defaultSortBy);

      history.push({
        search: searchParams.toString(),
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (specCateg && specCateg.data && specCateg.data.getSpecCateg) {
      const editingProd: SpecProdsCategory = specCateg.data.getSpecCateg.find(
        (categ: SpecProdsCategory) => categ.id === editingId
      );

      if (!editingProd) {
        return;
      }
      setEditingCategory(editingProd);
      setCheckedProds(editingProd.products);
      setCategName(editingProd.name);
    }
  }, [specCateg, editingId]);

  const handleCheck = (id: string) => {
    if (checkedProds.find((cehcked) => cehcked === id)) {
      setCheckedProds(checkedProds.filter((checked) => checked !== id));
    } else {
      setCheckedProds([...checkedProds, id]);
    }
  };

  useEffect(() => {
    if (products && products.data && products.data.products) {
      const prods: ProductsCategory[] = products.data.products;

      if (specCateg && specCateg.data) {
        const categs: SpecProdsCategory[] = specCateg.data.getSpecCateg;
        const filteredCategories = categs.filter(
          (categ) => categ.id !== editingId
        );
        const nonVisible = filteredCategories.map((categ) => categ.products);
        const visibleProds = prods.filter((prod) => {
          const flatNonVisible = nonVisible.flat(Infinity);
          return !flatNonVisible.includes(prod.id);
        });

        setProds(visibleProds);

        return;
      }

      setProds(prods);
    }
  }, [products, specCateg, editingId]);

  const handleRemoveSpecCateg = async () => {
    if (editingId) {
      await removeSpecCateg({
        variables: { id: editingId },
        refetchQueries: [
          {
            query: getSpecCategQuery,
          },
        ],
      })
        .then(() => {
          setBackgroundCover(false);
          setCancel(true);
        })
        .catch(() => {
          setBackgroundCover(false);
        });
    }
  };

  const handleAddSpecCateg = async () => {
    if (categName.trim().length > 2) {
      if (isNewCategory) {
        await addSpecCateg({
          variables: {
            name: categName,
            products: checkedProds,
          },
          refetchQueries: [
            {
              query: getSpecCategQuery,
            },
          ],
        })
          .then(() => setCancel(true))
          .catch(() => console.log("err"));
      } else {
        await updateSpecCateg({
          variables: {
            id: editingId,
            name: categName,
            products: checkedProds,
          },
        }).catch(() => console.log("err"));
      }
    }
  };

  const dis = useMemo(() => {
    if (editingId) {
      if (
        editingCategory?.name === categName &&
        editingCategory.products.every((edit) =>
          checkedProds.some((prod) => prod === edit)
        ) &&
        editingCategory.products.length === checkedProds.length
      ) {
        return true;
      }
    }

    return false;
  }, [editingId, categName, editingCategory, checkedProds]);

  const deleteCateg = () => {
    setBackgroundCover(true);
  };

  const filteredProducts: ProductsCategory[] = useMemo(() => {
    if (!filterSearch) {
      return prods;
    }

    return prods.filter((prod) =>
      prod.title.toLocaleLowerCase().includes(filterSearch.toLocaleLowerCase())
    );
  }, [filterSearch, prods]);

  const sortedByStatus: ProductsCategory[] = useMemo(() => {
    if (visible === "Добавленные") {
      return filteredProducts.filter((prod) =>
        checkedProds.some((checked) => checked === prod.id)
      );
    } else if (visible === "Недобавленные") {
      return filteredProducts.filter(
        (prod) => !checkedProds.some((checked) => checked === prod.id)
      );
    } else {
      return filteredProducts;
    }
  }, [filteredProducts, visible, checkedProds]);

  const visibleProducts: ProductsCategory[] = useMemo(
    () =>
      filterProductsWithoutQuery(
        sortBy,
        defaultSortBy,
        categories,
        sortedByStatus
      ),
    [sortedByStatus, categories, sortBy]
  );

  return (
    <>
      {cancel && <Redirect to="/settings/category" />}
      {bachgroundCover && editingId && (
        <div className="SettingsCategoryNew__RemoveCateg">
          <p className="SettingsCategoryNew__RemoveText">
            Удалить спец. категорию?
          </p>
          <div className="SettingsCategoryNew__RemoveBtnWrap">
            <button
              className="SettingscategoryNew__Remove SettingsCategoryNew__Btn"
              onClick={handleRemoveSpecCateg}
            >
              Удалить
            </button>
            <button
              className="SettingsCategoryNew__Cancel SettingsCategoryNew__Btn"
              onClick={() => setBackgroundCover(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
      <div className="SettingsCategoryNew Pages__Wrap">
        <label>
          <input
            type="text"
            className="SettingsCategoryNew__Filter"
            placeholder="Поиск по товарам"
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
          />
        </label>

        <h1 className="Pages__Title">
          Настройки – Категории -{" "}
          {isNewCategory ? "Добавление новой спец. категории" : `${categName}`}
        </h1>

        <div className="SettingsCategoryNew__Wrap">
          <form
            className="SettingsCategoryNew__Form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="SettingsCategoryNew__Input"
              placeholder="Название категории"
              value={categName}
              onChange={(e) => setCategName(e.target.value)}
            />
            {isNewCategory && (
              <button
                className="SettingsCategoryNew__Save"
                onClick={handleAddSpecCateg}
              >
                Добавить
              </button>
            )}
            {!isNewCategory && (
              <SettingsCategorySpecButtonsOld
                save={handleAddSpecCateg}
                remove={deleteCateg}
                disabled={dis}
              />
            )}
          </form>

          <h3 className="SettingsCategoryNew__SubTitle">
            Отметьте те товары, которые должны входить в данную категорию
          </h3>

          <div className="SettingsCategoryNew__SettingsWrap">
            <ProductsSelect
              mainText="Отображать на странице:"
              options={["Все", "Добавленные", "Недобавленные"]}
              urlType={status}
              width={205}
              callback={setVisible}
            />
            <ProductsSelect
              mainText="Категория:"
              options={[
                "Все товары",
                ...categories.map((categ) => categ.category),
              ]}
              urlType={sortCategory}
              width={188}
              callback={setSortBy}
            />
          </div>

          <div
            className={cn({
              SettingsCategoryNew__Products: true,
              "SettingsCategoryNew__Products--notAvailable": !visibleProducts.length,
            })}
          >
            {visibleProducts.length === 0 && (
              <p className="SettingsCategoryNew__NotAvailable">
                Нет доступных товаров.
              </p>
            )}
            {visibleProducts.length > 0 &&
              visibleProducts.map((prod) => (
                <SettingsCategorySpecItem
                  key={prod.id}
                  id={prod.id}
                  handleCheck={handleCheck}
                  previewPhoto={prod.previewPhoto}
                  title={prod.title}
                  type={prod.type}
                  checked={checkedProds}
                  categories={categories}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
