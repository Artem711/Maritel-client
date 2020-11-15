import React from "react";
import "./SettingsMainButton.scss";

interface Props {
  disabledSave: boolean;
  save: () => void;
  cancel: () => void;
}

export const SettingsMainButton: React.FC<Props> = ({
  disabledSave,
  save,
  cancel,
}) => (
  <div className="SettingsMainButton">
    <button
      className="SettingsMainButton__Button SettingsMainButton__Button--save"
      onClick={save}
      disabled={disabledSave}
    >
      Сохранить
    </button>
    <button
      className="SettingsMainButton__Button SettingsMainButton__Button--cancel"
      onClick={cancel}
    >
      Отмена
    </button>
  </div>
);
