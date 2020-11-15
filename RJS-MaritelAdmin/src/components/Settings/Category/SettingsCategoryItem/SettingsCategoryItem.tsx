import React from "react";
import "./SettingsCategoryItem.scss";

interface Props {
  category: string;
  id: string;
  handleStartEditing: (id: string, category: string) => void;
}

export const SettingsCategoryItem: React.FC<Props> = ({
  category,
  handleStartEditing,
  id,
}) => (
  <div className="SettingsCategoryItem__Item">
    <p>{category}</p>
    <div
      className="SettingsCategoryItem__ImgWrap"
      onClick={() => handleStartEditing(id, category)}
    >
      <img
        src="images/settings/categories/edit.svg"
        alt="edit"
        className="SettingsCategoryItem__Img"
      />
    </div>
  </div>
);
