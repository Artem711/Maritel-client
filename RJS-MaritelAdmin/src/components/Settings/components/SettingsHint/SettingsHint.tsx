import React from "react";
import "./SettingsHint.scss";

interface Props {
  text: string;
}

export const SettingsHint: React.FC<Props> = ({text}) => {
  return (
    <span className="SettingsHint__Hint">
      {text}
    </span>
  );
};
