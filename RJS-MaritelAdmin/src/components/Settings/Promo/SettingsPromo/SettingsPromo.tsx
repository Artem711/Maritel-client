import React, { useState, useEffect } from "react";
import "./SettingsPromo.scss";
import { SettingsPromoDisc } from "../SettingsPromoDisc";
import { useMutation, useQuery } from "react-apollo";
import {
  addPromoMutation,
  deletePromoMutation,
} from "../../../../helpers/gqlMutation";
import { getPromoQuery } from "../../../../helpers/gqlQueries";

export const SettingsPromo = () => {
  const [addPromo] = useMutation(addPromoMutation);
  const [deletePromo] = useMutation(deletePromoMutation);
  const promoQuery = useQuery(getPromoQuery);

  const [activeDisc, setActiveDisc] = useState<promo>("percent");
  const [promoName, setPromoName] = useState("");
  const [promoValue, setPromoValue] = useState("");
  const [loadingPromo, setLoadingPromo] = useState(false);
  const [promo, setPromo] = useState<SettingsPromo[]>([]);

  const changeActiveDisc = (value: promo) => {
    setActiveDisc(value);
    setPromoValue("");
  };

  useEffect(() => {
    if (promoQuery && promoQuery.data) {
      setPromo(promoQuery.data.getAllPromo);
    }
  }, [promoQuery]);

  const handleChangePromoValue = (value: string) => {
    const val = value.replace(/\D/g, "");

    if (activeDisc === "percent") {
      if (+value >= 100) {
        setPromoValue("99");

        return;
      }
    }

    setPromoValue(val);
  };

  const submitPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPromo(true);

    if (promoName.trim().length && promoValue.trim().length) {
      const variables: SettingsPromo = {
        promoDisc: activeDisc,
        promoName,
        promoValue,
        id: "",
      };

      delete variables.id;

      await addPromo({
        variables,
        refetchQueries: [
          {
            query: getPromoQuery,
          },
        ],
      }).then(() => {
        setLoadingPromo(false);
        resetFields();
      });
    } else {
      setLoadingPromo(false);
    }
  };

  const resetFields = () => {
    setPromoName("");
    setPromoValue("");
  };

  const delPromo = async (id: string) => {
    await deletePromo({
      variables: { id },
      refetchQueries: [{ query: getPromoQuery }],
    });
  };

  return (
    <div className="SettingsPromo Pages__Wrap">
      <h1 className="Pages__Title">Настройки - Промокоды</h1>

      <div className="SettingsPromo__Wrap">
        <form className="SettingsPromo__Form" onSubmit={submitPromo}>
          <input
            type="text"
            className="SettingsPromo__Inp"
            placeholder="Новый промокод"
            value={promoName}
            onChange={(e) => setPromoName(e.target.value)}
          />
          <div className="SettingsPromo__Discount">
            <SettingsPromoDisc
              setActiveDisc={changeActiveDisc}
              value="percent"
              activeDisc={activeDisc}
              promoValue={promoValue}
              changeValue={handleChangePromoValue}
              palceholder="%"
            />
            <SettingsPromoDisc
              setActiveDisc={changeActiveDisc}
              value="grn"
              activeDisc={activeDisc}
              promoValue={promoValue}
              changeValue={handleChangePromoValue}
              palceholder="Сумма"
            />
          </div>
          <button
            className="SettingsPromo__Add"
            type="submit"
            disabled={loadingPromo}
          >
            Добавить
          </button>
        </form>

        <ul className="SettingsPromo__List">
          {promo.map((prom) => (
            <li key={prom.promoName} className="SettingsPromo__Item">
              <p className="SettingsPromo__Name">{prom.promoName}</p>
              <p className="SettingsPromo__Percent">
                {prom.promoDisc === "percent" ? `${prom.promoValue}%` : "-"}
              </p>
              <p className="SettingsPromo__Grn">
                {prom.promoDisc === "grn" ? `${prom.promoValue} грн` : "-"}
              </p>
              <div
                className="SettingsPromo__ImgWrap"
                onClick={() => delPromo(prom.id)}
              >
                <img
                  src="images/settings/categories/trash.svg"
                  alt="remove"
                  className="SettingsPromo__Img"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
