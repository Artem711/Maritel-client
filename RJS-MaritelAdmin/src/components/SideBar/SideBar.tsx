import React, { useContext } from "react";
import "./SideBar.scss";
import { ADMIN_PANEL_NAV } from "../../helpers";
import { AdminNav } from "./AdminNav";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import cn from "classnames";
import { AuthContext } from "../../context/authContext";
import { AppContext } from "../../context/appContext";

export const SideBar = () => {
  const { logout } = useContext(AuthContext);
  const { userInfo } = useContext(AppContext);
  const location = useLocation();
  const history = useHistory();

  const logoutFromSystem = () => {
    logout();
    history.push({
      pathname: "/login",
    });
  };

  return (
    <div className="SideBar">
      <div className="SideBar__PanelLogo">
        <img
          src="images/logo.svg"
          alt="Logo"
          className="SideBar__PanelLogoImg"
        />
      </div>
      <p className="SideBar__Nav">Навигация</p>
      <ul className="SideBar__NavList">
        {Object.keys(ADMIN_PANEL_NAV).map((key) => (
          <li
            className={cn({
              SideBar__NavItem: true,
              SideBar__ActiveNavLink: location.pathname.startsWith(
                ADMIN_PANEL_NAV[key].link
              ),
            })}
            key={key}
          >
            <NavLink
              to={ADMIN_PANEL_NAV[key].link}
              className="SideBar__NavLink"
            >
              <AdminNav
                name={ADMIN_PANEL_NAV[key].name}
                img={ADMIN_PANEL_NAV[key].img}
              />
            </NavLink>
          </li>
        ))}
      </ul>
      <p className="SideBar__Nav">авторизация</p>

      <div className="SideBar__User">
        <img
          src={`images/user/${
            userInfo.rights ? `${userInfo.rights}.svg` : "plug.png"
          }`}
          alt="user type"
          className="SideBar__UserImg"
        />
        <p className="SideBar__UserType">{userInfo.name}</p>
      </div>
      <div className="SideBar__Logout">
        <p className="SideBar__LogoutText" onClick={logoutFromSystem}>
          Выйти
        </p>
      </div>
    </div>
  );
};
