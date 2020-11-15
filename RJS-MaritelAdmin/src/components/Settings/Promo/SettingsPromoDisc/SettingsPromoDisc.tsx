import React from "react";
import "./SettingsPromoDisc.scss";
import cn from "classnames";

interface Props {
  setActiveDisc: (value: promo) => void;
  value: promo;
  activeDisc: string;
  promoValue: string;
  palceholder: string;
  changeValue: (value: string) => void;
}

export const SettingsPromoDisc: React.FC<Props> = ({
  setActiveDisc,
  value,
  promoValue,
  activeDisc,
  palceholder,
  changeValue,
}) => (
  <label className="SettingsPromo__Label" onClick={() => setActiveDisc(value)}>
    <span
      className={cn({
        SettingsPromo__Span: true,
        "SettingsPromo__Span--active": activeDisc === value,
      })}
    />
    <input
      type="text"
      className={cn({
        SettingsPromo__DiscountInp: true,
        "SettingsPromo__DiscountInp--active": activeDisc === value,
      })}
      placeholder={palceholder}
      value={activeDisc === value ? promoValue : ""}
      onChange={e => changeValue(e.target.value)}
    />
  </label>
);
