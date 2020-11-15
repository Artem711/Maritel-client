import React from "react";
import "./SettingsMainInput.scss";
import cn from "classnames";

interface Props {
  placeholder: string;
  name: string;
  value: string;
  changeValue: (name: string, value: string) => void;
}

export const SettingsMainInput: React.FC<Props> = ({
  placeholder,
  name,
  value,
  changeValue,
}) => (
  <input
    type="text"
    className={cn({
      SettingsMainInput: true,
    })}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={(e) => changeValue(e.target.name, e.target.value)}
  />
);
