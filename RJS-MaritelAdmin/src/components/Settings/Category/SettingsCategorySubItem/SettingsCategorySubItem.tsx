import React from "react";
import "./SettingsCategorySubItem.scss";
import cn from "classnames";
import { SettingsHint } from "../../components/SettingsHint";

interface Props {
  subs: string;
  categId: string;
  subId: string;
  handleStartSubEditing: (categId: string, subs: string, subId: string) => void;
  dis: boolean;
  handleRemoveSubCateg: (categId: string, subId: string) => void;
}

export const SettingsCategorySubItem: React.FC<Props> = ({
  subs,
  categId,
  subId,
  handleStartSubEditing,
  handleRemoveSubCateg,
  dis,
}) => (
  <div className="SettingsCateg__SubWrapper">
    <div className="SettingsCateg__SubItem">
      {subs}
      <div
        className="SettingsCateg__ImgWrap"
        onClick={() => handleStartSubEditing(categId, subs, subId)}
      >
        <img src="images/settings/categories/edit.svg" alt="edit" />
      </div>
    </div>
    <div className="SettingsCateg__SubSettings">
      <div
        className={cn({
          SettingsCateg__ImgWrap: true,
          "SettingsCateg__ImgWrap--dis": dis,
        })}
        onClick={() => {
          if (!dis) {
            handleRemoveSubCateg(categId, subId);
          }
        }}
      >
        <img
          src="images/settings/categories/trash.svg"
          alt="remove sub item"
          className={cn({
            "SettingsCateg__ImgTrash--dis": dis,
          })}
        />
        {dis && (
          <SettingsHint text="Невозможно удалить подкатегорию, в которой содержатся товары." />
        )}
      </div>
    </div>
  </div>
);
