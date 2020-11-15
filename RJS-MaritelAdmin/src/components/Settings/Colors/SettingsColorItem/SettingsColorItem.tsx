import React, { useState } from "react";
import "./SettingsColorItem.scss";
import cn from "classnames";

interface Props {
  id: string;
  name: string;
  link: string;
  startEdit: (id: string) => void;
  disableDelete: (id: string) => boolean;
  removeColor: (id: string) => void;
}

export const SettingsColorItem: React.FC<Props> = ({
  id,
  name,
  link,
  startEdit,
  disableDelete,
  removeColor,
}) => {
  const [saveLink] = useState(link);
  const [previewLink, setPreviewLink] = useState(link);

  const errorLoadFile = () => {
    setPreviewLink("");
    setTimeout(() => setPreviewLink(saveLink), 0);
  };

  return (
    <li className="SettingsColorItem__ColorItem">
      <p className="SettingsColorItem__ColorName">{name}</p>
      <img
        src={previewLink}
        alt="color"
        className="SettingsColorItem__ItemImg"
        onError={errorLoadFile}
      />
      <div className="SettingsColorItem__SettingsWrap">
        <div
          className="SettingsColorItem__ImgWrap"
          onClick={() => startEdit(id)}
        >
          <img
            src="images/settings/categories/edit.svg"
            alt="edit"
            className="SettingsColorItem__Icons"
          />
        </div>
        <div
          className={cn({
            SettingsColorItem__ImgWrap: true,
            "SettingsColorItem__ImgWrap--dis": disableDelete(id),
          })}
          onClick={() => {
            if (!disableDelete(id)) {
              removeColor(id);
            }
          }}
        >
          <img
            src="images/settings/categories/trash.svg"
            alt="remove"
            className={cn({
              SettingsColorItem__Icons: true,
              "SettingsColorItem__Icons--dis": disableDelete(id),
            })}
          />
          {disableDelete(id) && (
            <span className="SettingsColorItem__Hint">
              Невозможно удалить цвет, который содержится в товаре.
            </span>
          )}
        </div>
      </div>
    </li>
  );
};
