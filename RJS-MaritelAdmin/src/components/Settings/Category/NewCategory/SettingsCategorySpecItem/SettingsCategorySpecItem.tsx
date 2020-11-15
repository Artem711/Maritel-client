import React from "react";
import "./SettingsCategorySpecItem.scss";
import { splitValue } from "../../../../../helpers";
import cn from "classnames";
import { getType } from "../../../../../helpers/getTitle";

interface Props {
  id: string;
  handleCheck: (id: string) => void;
  previewPhoto: string;
  title: string;
  categories: CategoriesTypes[];
  type: string;
  checked: string[];
}

export const SettingsCategorySpecItem: React.FC<Props> = ({
  id,
  handleCheck,
  previewPhoto,
  title,
  categories,
  type,
  checked,
}) => {
  return (
    <div
      key={id}
      className="SettingsCategorySpecItem__ProductItem"
      onClick={() => handleCheck(id)}
    >
      <div className="SettingsCategorySpecItem__LeftSide">
        <img
          src={previewPhoto}
          alt="preview"
          className="SettingsCategorySpecItem__ProductImg"
        />
        <div className="SettingsCategorySpecItem__ProductInfo">
          <p className="SettingsCategorySpecItem__ProductTitle">{title}</p>
          <p className="SettingsCategorySpecItem__ProductType">
            {getType(
              categories,
              type,
              (categ: CategoriesTypes) =>
                categ.id === type.split(splitValue)[0],
              (categ: SubCateg) => categ.id === type.split(splitValue)[1]
            )}
          </p>
        </div>
      </div>
      <div
        className={cn({
          SettingsCategorySpecItem__RightSide: true,
          "SettingsCategorySpecItem__RightSide--checked": checked.some(
            (check) => check === id
          ),
        })}
      >
        <p
          className={cn({
            SettingsCategorySpecItem__Status: true,
          })}
        >
          {checked.some((check) => check === id) ? "выбрано" : "Не выбрано"}
        </p>
      </div>
    </div>
  );
};
