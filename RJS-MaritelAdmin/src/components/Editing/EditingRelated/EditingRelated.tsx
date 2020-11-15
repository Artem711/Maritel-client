import React, { useContext } from "react";
import "./EditingRelated.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/appContext";

interface Props {
  relatedProd: RelatedProd[];
  title: string;
}

export const EditingRelated: React.FC<Props> = ({ relatedProd, title }) => {
  const { colors } = useContext(AppContext);

  return (
    <div className="EditingRelated__Related">
      <p className="EditingRelated__RelatedText">
        Связанные товары{" "}
        <img
          src="images/edit/related.svg"
          alt="question"
          className="EditingRelated__RelatedImg"
        />
        <span className="EditingRelated__Hint">
          Когда два товара имеют одинаковое название, но имеют разные цвета,
          между ними устанавливается связь.
        </span>
      </p>
      {relatedProd.length === 0 ||
        (relatedProd.filter((prod) => prod.title === title).length === 0 && (
          <p className="EditingRelated__RelatedNon">Нет связанных товаров.</p>
        ))}
      <ul className="EditingRelated__RelatedList">
        {relatedProd.length > 0 &&
          title &&
          relatedProd
            .filter((prod) => prod.title === title)
            .map((prod) => (
              <li className="EditingRelated__RelatedItem" key={prod.uuid}>
                <Link
                  to={`/edit/${prod.uuid}`}
                  className="EditingRelated__RelatedTitle"
                >
                  {prod.title} -{" "}
                  {colors
                    .find((color) => color.id === prod.color)
                    ?.name.toLocaleLowerCase()}
                </Link>
                <img
                  className="EditingRelated__RelatedColor"
                  src={colors.find((color) => color.id === prod.color)?.link}
                  alt="Color"
                />
              </li>
            ))}
      </ul>
    </div>
  );
};
