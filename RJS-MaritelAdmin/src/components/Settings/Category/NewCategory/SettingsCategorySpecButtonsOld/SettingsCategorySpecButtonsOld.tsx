import React from "react";
import "./SettingsCategorySpecButtonsOld.scss";

interface Props {
  save: () => void;
  remove: () => void;
  disabled: boolean;
}

export const SettingsCategorySpecButtonsOld: React.FC<Props> = ({
  save,
  disabled,
  remove,
}) => (
  <div className="SettingsCategorySpecButtonsOld__ButtonsWrap">
    <button
      className="SettingsCategorySpecButtonsOld__Save SettingsCategorySpecButtonsOld__Button"
      onClick={save}
      disabled={disabled}
    >
      Сохранить изменения
    </button>
    <button
      className="SettingsCategorySpecButtonsOld__Unsave SettingsCategoryNew__Button"
      onClick={remove}
    >
      <img
        src="images/settings/categories/trash.svg"
        alt="trash"
        className="SettingsCategorySpecButtonsOld__ButtonImg"
      />
      Удалить категорию
    </button>
  </div>
);
