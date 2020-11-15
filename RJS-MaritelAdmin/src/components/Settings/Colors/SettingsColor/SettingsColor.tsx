import cn from "classnames";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { postData } from "../../../../helpers";
import {
  addColorMutation,
  deleteColorMutation,
  updateColorMutation,
} from "../../../../helpers/gqlMutation";
import {
  getColorsQuery,
  getProductsColorsQuery,
} from "../../../../helpers/gqlQueries";
import "./SettingsColor.scss";
import { SettingsColorItem } from "../SettingsColorItem";

export const SettingsColor = () => {
  const { data } = useQuery(getColorsQuery);
  const getColor = useQuery(getProductsColorsQuery);
  const [addColor] = useMutation(addColorMutation);
  const [deleteColor] = useMutation(deleteColorMutation);
  const [updateColor] = useMutation(updateColorMutation);

  const [colorName, setColorName] = useState("");
  const [colorLink, setColorLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [inputsError, setInputsError] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [colors, setColors] = useState<ColorTypes[]>([]);
  const [productsColors, setProductsColors] = useState<ProductsColors[]>([]);

  const handleReadFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const readerRes = reader.result;
        setColorLink(readerRes);
      }
    };
  };

  useEffect(() => {
    if (data && data.colors) {
      setColors(
        [...data.colors].sort((a: ColorTypes, b: ColorTypes) =>
          a.name.localeCompare(b.name)
        )
      );
    }

    if (getColor && getColor.data && getColor.data.products) {
      setProductsColors(getColor.data.products);
    }
  }, [data, getColor]);

  const handleLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setInputsError(false);

    e.preventDefault();
    if (files && files[0]) {
      setFile(files[0]);
      handleReadFile(files[0]);
    }
  };

  const handleChangeColor = (value: string) => {
    setColorName(value);
    setInputsError(false);
  };

  const handleUpdateColor = async (variables: ColorTypes) => {
    if (validateColor()) {
      await updateColor({
        variables,
        refetchQueries: [{ query: getColorsQuery }],
      })
        .then(() => {
          resetFields();
          setEditingId("");
        })
        .catch((e) => console.error(e));
    }
  };

  const validateColor = () => {
    if (colorLink.trim().length && colorName.trim().length) {
      return true;
    }
    setInputsError(true);
    return false;
  };

  const handleAddColor = async (variables: ColorTypes) => {
    delete variables.id;
    if (validateColor()) {
      await addColor({
        variables,
        refetchQueries: [
          {
            query: getColorsQuery,
          },
        ],
      })
        .then(() => resetFields())
        .catch((e) => console.error(e));
    }
  };

  const colorValidate = () => {
    if (!colorLink.length && colorName.trim().length < 2) {
      return true;
    }

    return false;
  };

  const load = async (formData: FormData) => {
    console.log('ininin');
    return await postData(formData);
  };

  const submitColor = async (e: React.FormEvent) => {
    e.preventDefault();
    let link = "";
    if (colorLink.startsWith("https://")) {
      link = colorLink;
    } else {
      const formData = new FormData();
      formData.set("file", file!);
      link = await load(formData);
    }

    if (editingId && wasChanged(editingId)) {
      resetFields();
      return;
    }

    if (colorValidate()) {
      setInputsError(true);
      return;
    }

    const variables = {
      id: editingId,
      name: colorName,
      link,
    };


    if (editingId) {

      handleUpdateColor(variables);
      return;
    }

    handleAddColor(variables);
  };

  const resetFields = () => {
    setFile(null);
    setColorLink("");
    setColorName("");
    setEditingId("");
  };

  const removeColor = async (id: string) => {
    await deleteColor({
      variables: { id },
      refetchQueries: [{ query: getColorsQuery }],
    });
  };

  const startEdit = (id: string) => {
    setEditingId(id);
    setColorLink(colors.find((color) => color.id === id)?.link || "");
    setColorName(colors.find((color) => color.id === id)?.name || "");
    setFile(null);
    setInputsError(false);
  };

  const wasChanged = (id: string) => {
    const color = colors.find((col) => col.id === id);
    const name = color?.name;
    const link = color?.link;

    if (name === colorName && link === colorLink) {
      return true;
    }

    return false;
  };

  const buttonTitle = () => {
    if (editingId && wasChanged(editingId)) {
      return "Отмена";
    } else if (editingId && !wasChanged(editingId)) {
      return "Сохранить";
    } else if (!editingId) {
      return "Добавить цвет в базу";
    }
  };

  const disableDelete = (id: string) => {
    if (productsColors.some((product) => product.color === id)) {
      return true;
    }

    return false;
  };

  return (
    <div className="SettingsColor Pages__Wrap">
      <h1 className="Pages__Title">Настройки - Цвета</h1>
      <form
        className="SettingsColor__Form"
        encType="multipart/form-data"
        action="/upload"
        method="post"
        onSubmit={submitColor}
      >
        <div className="SettingsColor__FormInp">
          <input
            type="text"
            className="SettingsColor__Input"
            placeholder="Название цвета"
            value={colorName}
            onChange={(e) => handleChangeColor(e.target.value)}
          />
          {!colorLink && <div className="SettingsColor__Color" />}
          {colorLink && (
            <img
              src={colorLink}
              alt="color"
              className="SettingsColor__ColorImg"
            />
          )}

          <label htmlFor="filedata">
            <input
              type="file"
              name="uploaded_file"
              id="filedata"
              className="SettingsColor__InputFile"
              onChange={handleLoadFile}
            />
            <span
              className={cn({
                SettingsColor__ColorCustom: true,
              })}
              data-title={file?.name || "Изобр."}
            />
          </label>
        </div>
        <button
          className={cn({
            SettingsColor__AddToBase: true,
            "SettingsColor__AddToBase--cancel": buttonTitle() === "Отмена",
          })}
          type="submit"
          disabled={inputsError}
        >
          {buttonTitle()}
        </button>
      </form>
      <div className="SettingsColor__ColorsBase">
        <h2 className="SettingsColor__Title">База цветов</h2>
        <ul className="SettingsColor__ColorList">
          {colors
            .filter((color) => color.id !== editingId)
            .map((color) => (
              <SettingsColorItem
                key={color.id}
                id={color.id}
                name={color.name}
                link={color.link}
                startEdit={startEdit}
                disableDelete={disableDelete}
                removeColor={removeColor}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};
