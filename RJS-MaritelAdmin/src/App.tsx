import React, { useContext, useEffect } from "react";
import { AppContext } from "./context/appContext";
import { PopupDeleteProduct } from "./components/Products/PopupDeleteProduct";
import { useRoutes } from "./routes/routes";
import "./styles/index.scss";
import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/auth.hook";
import { useQuery } from "react-apollo";
import {
  getUserQuery,
  getCategoriesQuery,
  getColorsQuery,
  getSpecCategQuery,
} from "./helpers/gqlQueries";

const App = () => {
  const {
    deletePopup,
    bachgroundCover,
    setUserInfo,
    setCategories,
    setColors,
    setSpecCategs,
  } = useContext(AppContext);
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  const categ = useQuery(getCategoriesQuery);
  const getColors = useQuery(getColorsQuery);
  const { data } = useQuery(getUserQuery, {
    variables: { id: userId },
  });
  const specCategs = useQuery(getSpecCategQuery);


  useEffect(() => {
    if (data && data.user) {
      setUserInfo(data.user);
    }
  }, [data, setUserInfo]);

  useEffect(() => {
    if (categ && categ.data && categ.data.categories) {
      const categories = categ.data.categories.map(
        (category: CategoriesFromDB) => ({
          ...category,
          subCategories: JSON.parse(category.subCategories),
        })
      );
      setCategories(
        categories.sort((a: CategoriesTypes, b: CategoriesTypes) =>
          a.category.localeCompare(b.category)
        )
      );
    }
  }, [categ, setCategories]);

  useEffect(() => {
    if (getColors && getColors.data && getColors.data.colors) {
      setColors(
        [...getColors.data.colors].sort((a: ColorTypes, b: ColorTypes) =>
          a.name.localeCompare(b.name)
        )
      );
    }
  }, [getColors, setColors]);

  useEffect(() => {
    if (specCategs && specCategs.data) {
      setSpecCategs(specCategs.data.getSpecCateg);
    }
  }, [specCategs, setSpecCategs]);

  return (
    <>
      {deletePopup && bachgroundCover && <PopupDeleteProduct />}
      {bachgroundCover && <div className="behind__Background" />}
      <AuthContext.Provider
        value={{ login, logout, token, userId, isAuthenticated }}
      >
        {routes}
      </AuthContext.Provider>
    </>
  );
};

export default App;
