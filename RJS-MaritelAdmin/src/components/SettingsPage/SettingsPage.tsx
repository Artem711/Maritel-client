import React from "react";
import "./SettingsPage.scss";
import { SETTINGS_PAGE } from "../../helpers";
import { Link } from "react-router-dom";

export const SettingsPage = () => {
  return (
    <div className="SettingsPage Pages__Wrap">
      <h1 className="Pages__Title">Настройки</h1>
      <div className="SettingsPage__Settings">
        {SETTINGS_PAGE.map((setting) => (
          <Link
            to={setting.link}
            key={setting.name}
            className="SettingsPage__Link"
          >
            <img
              src={setting.img}
              alt={setting.name}
              className="SettingsPage__Img"
            />
            <p className="SettingsPage__Name">{setting.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
