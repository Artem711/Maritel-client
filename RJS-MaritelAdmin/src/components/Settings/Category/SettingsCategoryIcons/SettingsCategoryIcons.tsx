import React from "react";
import "./SettingsCategoryIcons.scss";
import cn from "classnames";
import { SettingsHint } from "../../components/SettingsHint";

interface Props {
  setEditingSubId: (id: string) => void;
  handleDeleteCategory: (id: string) => void;
  id: string;
  img1: string;
  img2: string;
  disabled: boolean;
}

export const SettingsCategoryIcons: React.FC<Props> = ({
  setEditingSubId,
  handleDeleteCategory,
  id,
  img1,
  img2,
  disabled,
}) => {
  return (
    <div className="SettingsCateg__Settings">
      <div
        className="SettingsCateg__ImgWrap"
        onClick={() => setEditingSubId(id)}
      >
        <img src={img1} alt="add" className="SettingsCateg__Img" />
      </div>
      <div
        className={cn({
          SettingsCateg__ImgWrap: true,
          "SettingsCateg__ImgWrap--dis": disabled,
          SettingsCategoryIcons__ImgWrap: true,
        })}
        onClick={() => {
          if (!disabled) {
            handleDeleteCategory(id);
          }
        }}
      >
        <img
          src={img2}
          alt="delete"
          className={cn({
            SettingsCateg__ImgTrash: true,
            "SettingsCateg__ImgTrash--dis": disabled,
          })}
        />
        {disabled && (
          <SettingsHint text="Невозможно удалить категорию, в которой содержатся товары." />
        )}
      </div>
    </div>
  );
};
