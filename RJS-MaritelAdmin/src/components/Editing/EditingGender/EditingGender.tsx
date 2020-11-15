import React, { useContext, useState } from "react";
import "./EditingGender.scss";
import { EditingContext } from "../../../editingContext";
import { GENDER } from "../../../helpers";
import cn from "classnames";

interface Props {
  name: string;
  value: string;
  error: boolean;
}

export const EditingGender: React.FC<Props> = ({ name, value, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { handleChangeFields, handleError } = useContext(EditingContext);

  const handleChangeValue = (value: string) => {
    handleChangeFields(value, name);
    handleError(false, name);
    setIsOpen(false);
  };

  const clickSubscribe = () => {
    if (isOpen && !value) {
      setIsOpen(false);
      handleError(true, name);
    } else if (!isOpen) {
      setIsOpen(true);
      handleError(false, name);
    } else {
      setIsOpen(false);
      handleError(false, name);
      setIsOpen(false);
    }
  };

  return (
    <div className="EditingGender">
      <div
        className={cn({
          EditingGender__Main: true,
          "EditingGender__Main--open": isOpen,
          "EditingGender__Main--success": value && !isOpen && !error,
          "EditingGender__Main--error": !isOpen && error,
        })}
        onClick={clickSubscribe}
      >
        <p
          className={cn({
            EditingGender__MainText: true,
            "EditingGender__MainText--default": !value,
          })}
        >
          {value || "Пол"}
        </p>
        <img
          src="images/products/selectArrow.svg"
          alt="arrow"
          className={cn({
            EditingGender__Arrow: true,
            "EditingGender__Arrow--down": isOpen,
          })}
        />
      </div>
      <ul
        className={cn({
          EditingGender__List: true,
          "EditingGender__List--open": isOpen,
        })}
      >
        {GENDER.filter((gender) => gender !== value).map((gender) => (
          <li
            key={gender}
            className="EditingGender__Item"
            onClick={() => handleChangeValue(gender)}
          >
            {gender}
          </li>
        ))}
      </ul>
    </div>
  );
};
