import React from "react";
import "./NoAccess.scss";

export const NoAccess = () => {
  return (
    <div className="NoAccess Pages__Wrap">
      <img src="images/noAccess/noAccess.svg" alt="nop access" />
      <p className="NoAccess__Text">
        У вас недостаточно прав для доступа к этому разделу.
      </p>
    </div>
  );
};
