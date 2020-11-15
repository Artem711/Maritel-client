import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { EditingPage } from "../components/EditingPage";
import { LoginPage } from "../components/LoginPage";
import { Plug } from "../components/Plug";
import { ProductsPage } from "../components/ProductsPage";
import { SideBar } from "../components/SideBar";
import { EditingContextWrapper } from "../editingContext";
import { SettingsPage } from "../components/SettingsPage";
import { SettingsCateg } from "../components/Settings/Category/SettingsCateg";
import { SettingsColor } from "../components/Settings/Colors/SettingsColor";
import { SettingsMain } from "../components/Settings/SettingsMain";
import { SettingsServices } from "../components/Settings/SettingsServices";
import { SettingsPromo } from "../components/Settings/Promo/SettingsPromo";
import { SettingsOrders } from "../components/Settings/Orders/SettingsOrders";
import { CategoryMain } from "../components/Settings/Category/CategoryMain";
import { SettingsCategoryNew } from "../components/Settings/Category/NewCategory/SettingsCategoryNew";
import { SettingsStaff } from "../components/Settings/Staff/SettingsStaff";
import { AppContext } from "../context/appContext";
import { NoAccess } from "../components/NoAccess";
import { SpinnerLoadAccess } from "../components/Spinners";

export const useRoutes = (isAuth: boolean) => {
  const { userInfo } = useContext(AppContext);

  return isAuth ? (
    <div className="wrapper">
      <SideBar />
      <div className="App">
        <Switch>
          {userInfo.id ? (
            <>
              {userInfo.orders ? (
                <Route path="/orders" exact component={Plug} />
              ) : (
                <Route path="/orders" exact component={NoAccess} />
              )}
              {userInfo.settings ? (
                <>
                  <Route path="/settings" exact component={SettingsPage} />
                  <Route
                    path="/settings/category"
                    exact
                    component={CategoryMain}
                  />
                  <Route
                    path="/settings/category/main"
                    exact
                    component={SettingsCateg}
                  />
                  <Route
                    path="/settings/category/new"
                    exact
                    component={SettingsCategoryNew}
                  />
                  <Route
                    path="/settings/category/editSpec/:id"
                    exact
                    component={SettingsCategoryNew}
                  />
                  <Route
                    path="/settings/colors"
                    exact
                    component={SettingsColor}
                  />
                  <Route
                    path="/settings/basic"
                    exact
                    component={SettingsMain}
                  />
                  <Route
                    path="/settings/services"
                    exact
                    component={SettingsServices}
                  />
                  <Route
                    path="/settings/promo"
                    exact
                    component={SettingsPromo}
                  />
                  <Route
                    path="/settings/orders"
                    exact
                    component={SettingsOrders}
                  />
                </>
              ) : (
                <>
                  <Route path="/settings" exact component={NoAccess} />
                </>
              )}
              {userInfo.users ? (
                <>
                  <Route
                    path="/settings/staff"
                    exact
                    component={SettingsStaff}
                  />
                  <Route path="/users" exact component={Plug} />
                </>
              ) : (
                <>
                  <Route path="/settings/staff" exact component={NoAccess} />
                  <Route path="/users" exact component={NoAccess} />
                </>
              )}
              {userInfo.products ? (
                <>
                  <Route path="/products" exact component={ProductsPage} />
                  <EditingContextWrapper>
                    <Route path="/new" exact component={EditingPage} />
                    <Route path="/edit/:id" exact component={EditingPage} />
                  </EditingContextWrapper>
                </>
              ) : (
                <>
                  <Route path="/products" exact component={NoAccess} />
                </>
              )}
            </>
          ) : (
            <SpinnerLoadAccess />
          )}
        </Switch>
      </div>
    </div>
  ) : (
    <Switch>
      <Route path="/" component={LoginPage} />
    </Switch>
  );
};
