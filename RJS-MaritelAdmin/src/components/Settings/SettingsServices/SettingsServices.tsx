import React, { useState, useEffect, useMemo } from "react";
import "./SettingsServices.scss";
import { SettingsMainButton } from "../components/SettingsMainButton";
import cn from "classnames";
import { checkConnect } from "../../../helpers";
import { useMutation, useQuery } from "react-apollo";
import { updateMoySkladMutation } from "../../../helpers/gqlMutation";
import { getMoySkladData } from "../../../helpers/gqlQueries";

export const SettingsServices = () => {
  const [updateMoySklad] = useMutation(updateMoySkladMutation);
  const { data } = useQuery(getMoySkladData, {
    variables: {
      id: process.env.REACT_APP_MY_SKLAD_ID,
    },
  });
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loadnigMoySklad, setLoadnigMoySklad] = useState(false);
  const [successMoySklad, setSuccessMoySklad] = useState(false);
  const [err, setError] = useState(false);
  const [startValues, setStartValues] = useState<SettingsServices>({
    login: "",
    password: "",
  });

  // eslint-disable-next-line
  const check = async () => {
    setLoadnigMoySklad(true);

    await checkConnect(login, password).then(async (res) => {
      if (
        res.errors &&
        res.errors[0].error.startsWith("Ошибка аутентификации")
      ) {
        setSuccessMoySklad(false);
        setError(true);
      } else {
        setSuccessMoySklad(true);
        setError(false);
        await updateMoySklad({
          variables: {
            id: process.env.REACT_APP_MY_SKLAD_ID,
            login,
            password,
          },
          refetchQueries: [
            {
              query: getMoySkladData,
              variables: { id: process.env.REACT_APP_MY_SKLAD_ID },
            },
          ],
        });
      }

      setLoadnigMoySklad(false);
    });
  };

  useEffect(() => {
    if (data && data.getSklad) {
      setLogin(data.getSklad.login);
      setPassword(data.getSklad.password);
      setStartValues(data.getSklad);
      setSuccessMoySklad(true);
    }
  }, [data]);

  const subTitle = useMemo(() => {
    if (login === startValues.login && password === startValues.password) {
      setSuccessMoySklad(true);
      setError(false);

      return "Синхронизировано";
    } else if (loadnigMoySklad) {
      return "Проверка...";
    } else if (successMoySklad) {
      return "Синхронизировано";
    } else {
      return "Не синхронизировано";
    }
  }, [loadnigMoySklad, successMoySklad, login, password, startValues]);

  const cancelEditing = () => {
    setLogin(startValues.login);
    setPassword(startValues.password);
  };

  return (
    <div className="SettingsServices Pages__Wrap">
      <h1 className="Pages__Title">Настройки - Сервисы</h1>

      <div className="SettingsServices__MoySklad">
        <h2 className="SettingsServices__Title">
          МойСклад{" "}
          <span
            className={cn({
              SettingsServices__Status: true,
              "SettingsServices__Status--success":
                successMoySklad && !loadnigMoySklad,
              "SettingsServices__Status-error":
                !successMoySklad && !loadnigMoySklad,
            })}
          >
            {`(${subTitle})`}
          </span>
        </h2>
        <form>
          <input
            type="text"
            className={cn({
              SettingsServices__Inp: true,
              "SettingsServices__Inp--success":
                successMoySklad && !loadnigMoySklad,
              "SettingsServices__Inp--error":
                !successMoySklad && login && !loadnigMoySklad && err,
            })}
            placeholder="логин"
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
              setError(false);
              setSuccessMoySklad(false);
            }}
          />
          <input
            type="password"
            className={cn({
              SettingsServices__Inp: true,
              "SettingsServices__Inp--success":
                successMoySklad && !loadnigMoySklad,
              "SettingsServices__Inp--error":
                !successMoySklad && password && !loadnigMoySklad && err,
            })}
            placeholder="пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
              setSuccessMoySklad(false);
            }}
          />
        </form>
      </div>

      <SettingsMainButton
        cancel={cancelEditing}
        save={check}
        disabledSave={loadnigMoySklad}
      />
    </div>
  );
};
