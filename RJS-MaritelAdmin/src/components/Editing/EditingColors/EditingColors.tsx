import React, { useState, useContext } from "react";
import "./EditingColors.scss";
import cn from "classnames";
import { EditingContext } from "../../../editingContext";
import { AppContext } from "../../../context/appContext";

interface Props {
  currentColor: string;
  error: boolean;
  name: string;
}

export const EditingColros: React.FC<Props> = ({
  currentColor,
  name,
  error,
}) => {
  const { colors } = useContext(AppContext);
  const { handleChangeFields, handleError } = useContext(EditingContext);
  const [isOpen, setIsOpen] = useState(false);

  const setCurrentColor = (color: string) => {
    handleChangeFields(color, name);
    handleError(false, name);
    setIsOpen(false);
  };

  const handleOpenClose = () => {
    if (isOpen && !currentColor) {
      setIsOpen(false);
      handleError(true, name);
    } else if (!isOpen) {
      setIsOpen(true);
      handleError(false, name);
    } else {
      setIsOpen(false);
      handleError(false, name);
    }
  };

  return (
    <div className="EditingColors">
      <div
        className={cn({
          EditingColors__Select: true,
          "EditingColors__Select--open": isOpen,
          "EditingColors__Select--error": !isOpen && !currentColor && error,
          "EditingColors__Select--success": !isOpen && currentColor && !error,
        })}
        onClick={handleOpenClose}
      >
        <p className="EditingColors__Main">
          {colors.find((color) => color.id === currentColor)?.name || (
            <span className="EditingColors__Default">Цвет</span>
          )}
        </p>
        <img
          src="images/products/selectArrow.svg"
          alt="arrow"
          className={cn({
            EditingColors__Arrow: true,
            "EditingColors__Arrow--down": isOpen,
          })}
        />
      </div>
      {!currentColor && <div className="EditingColors__PreviewColor" />}
      {currentColor && (
        <img
          src={colors.find((color) => color.id === currentColor)?.link}
          alt="color"
          className="EditingColors__PreviewColorImg"
        />
      )}
      <ul
        className={cn({
          EditingColors__List: true,
          "EditingColors__List--open": isOpen,
        })}
      >
        {colors
          .filter((color) => color.id !== currentColor)
          .map((color) => (
            <li
              key={color.id}
              className="EditingColors__Item"
              onClick={() => setCurrentColor(color.id)}
            >
              {color.name}
            </li>
          ))}
      </ul>
    </div>
  );
};
