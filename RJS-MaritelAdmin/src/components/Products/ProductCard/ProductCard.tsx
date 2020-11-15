import React, { useContext, useState } from "react";
import "./ProductCard.scss";
import { AppContext } from "../../../context/appContext";
import cn from "classnames";
import { Link } from "react-router-dom";
import { splitValue } from "../../../helpers";
import { getType } from "../../../helpers/getTitle";

interface Props {
  id: string;
  title: string;
  descr: string;
  color: string;
  price: string;
  modelParam: string;
  composition: string;
  sizes: string;
  lastPrice: string;
  type: string;
  photos: string[];
  previewPhoto: string;
  singleClone: (id: string) => void;
  uuid: string;
}

export const ProductCard: React.FC<Props> = ({
  title,
  price,
  lastPrice,
  type,
  previewPhoto,
  singleClone,
  color,
  uuid,
}) => {
  const {
    deletePopupOpen,
    checked,
    setCheckedFn,
    setBackgroundCover,
    categories,
    colors,
  } = useContext(AppContext);
  const [preview, setPreview] = useState(previewPhoto);

  const callbackId = (categ: CategoriesTypes) =>
    categ.id === type.split(splitValue)[0];
  const callbackSubId = (categ: SubCateg) =>
    categ.id === type.split(splitValue)[1];

  return (
    <div className="ProductCard">
      <div className="ProductCard__LeftSide">
        <label>
          <input
            type="checkbox"
            className="ProductCard__Checkbox"
            checked={checked.some((checkId) => checkId === uuid)}
            onChange={() => setCheckedFn(uuid)}
          />
        </label>

        <Link className="ProductCard__LeftSideInfo" to={`/edit/${uuid}`}>
          <img
            src={preview}
            alt="preview"
            className="ProductCard__Photo"
            onError={() => setPreview("images/products/noPhoto.png")}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <div className="ProductCard__Text">
            <p className="ProductCard__Title">
              {title} ({colors.find((col) => col.id === color)?.name})
            </p>
            <p className="ProductCard__Type">
              {getType(categories, type, callbackId, callbackSubId)}
            </p>
          </div>
        </Link>
      </div>
      <div className="ProductCard__RightSide">
        <div className="ProductCard__Prices">
          {lastPrice ? (
            <>
              <p className="ProductCard__LastPrice">{lastPrice} грн</p>
              <p className="ProductCard__CurrentPrice">{price} грн</p>
            </>
          ) : (
            <p className="ProductCard__CurrentPrice">{price} грн</p>
          )}
        </div>
        <ul className="ProductCard__OptionsList">
          <li
            className={cn({
              ProductCard__OptionsItem: true,
              "ProductCard__OptionsItem--disabled": checked.length,
            })}
            onClick={() => singleClone(uuid)}
          >
            <img
              src="images/products/cloneProd.svg"
              alt="clone"
              className={cn({
                ProductCard__Active: true,
                ProductCard__NotActive: checked.length,
              })}
            />
          </li>
          <li
            className={cn({
              ProductCard__OptionsItem: true,
              "ProductCard__OptionsItem--disabled": checked.length,
            })}
          >
            <Link to={`/edit/${uuid}`}>
              <img
                src="images/products/editProd.svg"
                alt="edit"
                className={cn({
                  ProductCard__Active: true,
                  ProductCard__NotActive: checked.length,
                })}
              />
            </Link>
          </li>
          <li
            className={cn({
              ProductCard__OptionsItem: true,
              "ProductCard__OptionsItem--disabled": checked.length,
            })}
            onClick={() => {
              deletePopupOpen(true, uuid);
              setBackgroundCover(true);
            }}
          >
            <img
              src="images/products/deleteProd.svg"
              alt="delete"
              className={cn({
                ProductCard__Active: true,
                ProductCard__NotActive: checked.length,
              })}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
