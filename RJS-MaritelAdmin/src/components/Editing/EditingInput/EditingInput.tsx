import React, { useCallback, useContext } from "react";
import "./EditingInput.scss";
import cn from "classnames";
import { debounce } from "../../../helpers";
import { EditingContext } from "../../../editingContext";
interface Props {
  placeholder: string;
  value: string;
  name: string;
  error: boolean;
  related: (value: string) => void;
}

export const EditingInput: React.FC<Props> = ({
  placeholder,
  value,
  name,
  error,
  related,
}) => {
  const {validation, handleError, handleChangeFields} = useContext(EditingContext);

  const startDebounce = (value: string, name: string) => {
    debounceWrapper(value);
    handleChangeFields(value, name);
    handleError(false, name);
  };

  const debounceWrapper = useCallback(
    debounce((value: string) => related(value), 500),
    []
  );

  return (
    <label>
      <input
        type="text"
        placeholder={placeholder}
        className={cn({
          EditingInput__Input: true,
          "EditingInput__Input--error": error,
          "EditingInput__Input--success": !error && value,
        })}
        value={value}
        name={name}
        onChange={(e) => startDebounce(e.target.value, e.target.name)}
        onBlur={(e) => validation(e.target.name)}
      />
    </label>
  );
};
