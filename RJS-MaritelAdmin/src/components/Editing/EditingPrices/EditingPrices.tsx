import React, { useContext } from "react";
import "./EditingPrices.scss";
import cn from "classnames";
import { EditingContext } from "../../../editingContext";

interface Props {
  price: string;
  lastPrice: string;
  namePrice: string;
  nameLastPrice: string;
  errorPrice: boolean;
}

export const EditingPrices: React.FC<Props> = ({
  price,
  lastPrice,
  namePrice,
  nameLastPrice,
  errorPrice,
}) => {
  const {handleChangeFields, handleError} = useContext(EditingContext);
  const handleChangeValue = (name: string, value: string) => {
    handleChangeFields(value.replace(/\D/g, ""), name);
    handleError(false, name);
  };

  const handleBlur = (value: string, name: string) => {
    if (!value) {
      handleError(true, name);
    }
  };

  return (
    <div className="EditingPrices">
      <label className="EditingPrices__Label">
        <input
          type="text"
          className={cn({
            EditingPrices__Input: true,
            "EditingPrices__Input--error": errorPrice,
            "EditingPrices__Input--success": !errorPrice && price,
          })}
          placeholder="Текущая цена"
          name={namePrice}
          value={price}
          onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
          onBlur={(e) => handleBlur(e.target.value, e.target.name)}
        />
      </label>
      <label className="EditingPrices__Label">
        <input
          type="text"
          className="EditingPrices__Input"
          placeholder="Старая цена"
          name={nameLastPrice}
          value={lastPrice}
          onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
        />
      </label>
    </div>
  );
};
