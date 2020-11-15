import React, { useState, useContext } from "react";
import "./EditingSelect.scss";
import cn from "classnames";
import { splitValue, shoesMark } from "../../../helpers";
import { EditingContext } from "../../../editingContext";
import { AppContext } from "../../../context/appContext";

interface Props {
  currentValue: string;
  name: string;
  error: boolean;
}

export const EditingSelect: React.FC<Props> = ({
  currentValue,
  name,
  error,
}) => {
  const { setChoosenSizes, handleChangeFields, handleError } = useContext(
    EditingContext
  );
  const { categories } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const itemHeight = 30;

  const clickSubscribe = () => {
    if (isOpen && !currentValue) {
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

  const handleChooseOption = (option: string, id: string) => {
    if (
      (option !== shoesMark &&
        currentValue.split(splitValue)[0] === shoesMark) ||
      (option === shoesMark && currentValue.split(splitValue)[0] !== shoesMark)
    ) {
      setChoosenSizes([]);
    }

    handleError(false, name);
    handleChangeFields(id, name);
  };

  const handleChooseTypeOption = (id: string, subId: string) => {
    if (currentValue.split(splitValue).length === 2) {
      handleChangeFields(
        `${
          categories.find((categ) => categ.id === id)?.id
        }${splitValue}${subId}`,
        name
      );
    } else {
      handleChangeFields(
        `${
          categories.find((categ) => categ.id === id)?.id
        }${splitValue}${subId}`,
        name
      );
    }
  };
  const getId = () => currentValue.split(splitValue)[0];

  const callback = (categ: { id: string }) => categ.id === getId();

  const categoriesTitle = () => {
    if (
      categories.find(callback)?.category &&
      currentValue.split(splitValue).length === 2
    ) {
      return `${categories.find(callback)?.category}${splitValue}${
        categories
          .find(callback)
          ?.subCategories.find(
            (subCateg) => subCateg.id === currentValue.split(splitValue)[1]
          )?.subs
      }`;
    } else {
      return `${
        categories.find(callback)?.category
          ? categories.find(callback)?.category
          : "Категория"
      }`;
    }
  };

  return (
    <div className="EditingSelect">
      <div
        className={cn({
          EditingSelect__Main: true,
          "EditingSelect__Main--open": isOpen,
          "EditingSelect__Main--success": currentValue && !isOpen && !error,
          "EditingSelect__Main--error": error,
        })}
        onClick={clickSubscribe}
      >
        <p
          className={cn({
            EditingSelect__MainText: true,
            "EditingSelect__MainText--default": !currentValue,
          })}
        >
          {categoriesTitle()}
        </p>
        <img
          src="images/products/selectArrow.svg"
          alt="arrow"
          className={cn({
            EditingSelect__Arrow: true,
            "EditingSelect__Arrow--down": isOpen,
          })}
        />
      </div>
      <ul
        className={cn({
          EditingSelect__List: true,
          "EditingSelect__List--open": isOpen,
        })}
      >
        {categories.map((option) => (
          <React.Fragment key={option.id}>
            <li
              className={cn({
                EditingSelect__Item: true,
                "EditingSelect__Item--choosen": getId() === option.id,
              })}
              style={{
                marginBottom:
                  getId() === option.id
                    ? itemHeight * (option.subCategories.length || 0)
                    : 0,
              }}
            >
              <p
                className="EditingSelect__ItemText"
                onClick={() => handleChooseOption(option.category, option.id)}
              >
                {option.category}
              </p>
              {option.subCategories.length > 0 && getId() === option.id && (
                <ul className="EditingSelect__OptionList:">
                  {option.subCategories.map((subOpt) => (
                    <li
                      className={cn({
                        EditingSelect__OptionItem: true,
                        "EditingSelect__OptionItem--choosen":
                          currentValue.split(splitValue)[1] === subOpt.id,
                      })}
                      key={subOpt.id}
                      onClick={() =>
                        handleChooseTypeOption(option.id, subOpt.id)
                      }
                    >
                      {subOpt.subs}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};
