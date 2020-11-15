import React, { useState, useEffect } from "react";
import "./CategoryMain.scss";
import { Link } from "react-router-dom";
import { useQuery } from "react-apollo";
import { getSpecCategQuery } from "../../../../helpers/gqlQueries";
import { LoadSpinner } from "../../../Spinners";

export const CategoryMain = () => {
  const { data, loading } = useQuery(getSpecCategQuery);
  const [specCategs, setSpecCateg] = useState<SpecProdsCategory[]>([]);

  useEffect(() => {
    if (data) {
      setSpecCateg(data.getSpecCateg);
    }
  }, [data, setSpecCateg]);

  return (
    <div className="CategoryMain Pages__Wrap">
      <h1 className="Pages__Title">Настройки - Категории</h1>

      <div className="CategoryMain__Wrap">
        <ul className="CategoryMain__List">
          <li className="CategoryMain__Item">
            <Link to="/settings/category/main" className="CategoryMain__Link">
              Основные
            </Link>
          </li>
          {loading && (
            <li className="CategoryMain__Item">
              <LoadSpinner />
            </li>
          )}
          {specCategs.map((categ) => (
            <li className="CategoryMain__Item" key={categ.id}>
              <Link
                to={`/settings/category/editSpec/${categ.id}`}
                className="CategoryMain__Link CategoryMain__Link--spec"
              >
                {categ.name}
              </Link>
            </li>
          ))}
          <li className="CategoryMain__Item">
            <Link to="/settings/category/new" className="CategoryMain__AddMore">
              <p className="CategoryMain__AddText">
                {" "}
                <img
                  src="images/products/addProd.svg"
                  alt="add prod"
                  className="CategoryMain__AddImg"
                />
                Добавить еще
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
