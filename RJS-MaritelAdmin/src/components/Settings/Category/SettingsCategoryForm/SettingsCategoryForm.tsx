import React from "react";
import "./SettingsCategoryForm.scss";
import cn from "classnames";

interface Props {
  handleAddCategory: (e: React.FormEvent) => void;
  newCategory: string;
  setNewCategory: (value: string) => void;
  loadingAddCategory: boolean;
  btnText: string;
  error?: boolean;
  dis?: boolean;
}

export const SettingsCategoryForm: React.FC<Props> = ({
  handleAddCategory,
  newCategory,
  setNewCategory,
  loadingAddCategory,
  btnText,
  error,
  dis
}) => (
  <form className="SettingsCategoryForm__Form" onSubmit={handleAddCategory}>
    <input
      type="text"
      className={cn({
        SettingsCategoryForm__Input: true,
        "SettingsCategoryForm__Input--error": error,
      })}
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
      placeholder="Новая категория"
    />
    <button
      className="SettingsCategoryForm__Add"
      disabled={dis || loadingAddCategory}
      type="submit"
    >
      {btnText}
    </button>
  </form>
);
