import React, { useContext } from "react";
import "./EditingEditProductButtons.scss";
import { AppContext } from "../../../context/appContext";

interface Props {
  isOk: () => void;
  prodId: string;
  setCancel: (status: boolean) => void;
  disabled: boolean;
}

export const EditingEditProductButtons: React.FC<Props> = ({
  isOk,
  prodId,
  setCancel,
  disabled,
}) => {
  const { deletePopupOpen, setBackgroundCover } = useContext(
    AppContext
  );

  return (
    <>
      <div className="EditingPage__Buttons">
        <button
          className="EditingPage__Button EditingPage__Button--add"
          onClick={isOk}
          disabled={disabled}
        >
          Сохранить
        </button>
        <button
          className="EditingPage__Button EditingPage__Button--delete"
          onClick={() => {
            deletePopupOpen(true, prodId);
            setBackgroundCover(true);
          }}
        >
          Удалить товар
        </button>
      </div>
      <button
        className="EditingPage__Button EditingPage__Button--cancel EditingPage__Button--cancelN"
        onClick={() => {
          setCancel(true);
        }}
      >
        Отмена
      </button>
    </>
  );
};
