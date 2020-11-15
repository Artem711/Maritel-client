import React from "react";
import "./SettingsStaffInput.scss";
import cn from "classnames";

interface Props {
  type: string;
  name: AddStaffFieldsNames;
  placeholder: string;
  value: string;
  err: boolean;
  onChange: (name: string, value: string) => void;
  validation: (name: AddStaffFieldsNames) => void;
}

export const SettingsStaffInput: React.FC<Props> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  err,
  validation,
}) => {
  return (
    <input
      type={type}
      className={cn({
        SettingsStaffInput: true,
        "SettingsStaffInput--err": err,
      })}
      name={name}
      placeholder={`${placeholder}*`}
      value={value}
      onChange={(e) => onChange(e.target.name, e.target.value)}
      onBlur={() => validation(name)}
    />
  );
};
