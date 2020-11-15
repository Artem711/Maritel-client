import React from "react";
import "./SettingsStaffUserItem.scss";
import cn from "classnames";

interface Props {
  name: string;
  id: string;
  login: string;
  products: boolean;
  orders: boolean;
  settings: boolean;
  users: boolean;
  delUser: (id: string) => void;
  disabledDel: boolean;
  rights: string;
  updateRights: (id: string, name: string, rights: boolean) => void;
  loadUpdRights: boolean;
}

export const SettingsStaffUserItem: React.FC<Props> = ({
  name,
  login,
  products,
  orders,
  settings,
  users,
  id,
  delUser,
  disabledDel,
  rights,
  updateRights,
  loadUpdRights,
}) => (
  <li className="SettingsStaffUserItem__UserItem">
    <div className="SettingsStaffUserItem__LeftSide">
      <p className="SettingsStaffUserItem__UserName">{name}</p>
      <p className="SettingsStaffUserItem__UserLogin">{login}</p>
      <div
        className={cn({
          SettingsStaffUserItem__ImgWrap: true,
          "SettingsStaffUserItem__ImgWrap--dis": disabledDel,
        })}
      >
        <img
          src="images/settings/categories/trash.svg"
          alt="trash"
          className={cn({
            SettingsStaffUserItem__DelImg: true,
            "SettingsStaffUserItem__DelImg--dis": disabledDel,
          })}
          onClick={() => {
            if (!disabledDel) {
              delUser(id);
            }
          }}
        />
      </div>
    </div>
    <div className="SettingsStaffUserItem__RightSide">
      <input
        type="checkbox"
        className="SettingsStaffUserItem__Checkbox"
        checked={products}
        name="products"
        disabled={loadUpdRights || rights === "admin"}
        onChange={(e) => updateRights(id, e.target.name, e.target.checked)}
      />
      <input
        type="checkbox"
        className="SettingsStaffUserItem__Checkbox"
        checked={orders}
        name="orders"
        disabled={loadUpdRights || rights === "admin"}
        onChange={(e) => updateRights(id, e.target.name, e.target.checked)}
      />
      <input
        type="checkbox"
        className="SettingsStaffUserItem__Checkbox"
        checked={users}
        name="users"
        disabled={true}
        onChange={(e) => updateRights(id, e.target.name, e.target.checked)}
      />
      <input
        type="checkbox"
        className="SettingsStaffUserItem__Checkbox"
        checked={settings}
        name="settings"
        disabled={loadUpdRights || rights === "admin"}
        onChange={(e) => updateRights(id, e.target.name, e.target.checked)}
      />
    </div>
  </li>
);
