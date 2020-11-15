import React from "react";
import "./SpinnerLoadAccess.scss";

export const SpinnerLoadAccess = () => {
  return (
    <div className="SpinnerLoadAccess Pages__Wrap">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
