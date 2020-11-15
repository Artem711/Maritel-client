import React, { useState, useEffect } from "react";
import "./SettingsMain.scss";
import { SettingsMainButton } from "../components/SettingsMainButton";
import { SettingsMainInput } from "./SettingsMainInput";
import { DEFAULT_SETTINGS_BASIC, BASIC_CONFIG } from "../../../helpers";
import { useQuery, useMutation } from "react-apollo";
import { getBasicsSettingsQuery } from "../../../helpers/gqlQueries";
import { updateBasicMutation } from "../../../helpers/gqlMutation";

export const SettingsMain = () => {
  const getSettings = useQuery(getBasicsSettingsQuery);
  const [updateBasic] = useMutation(updateBasicMutation);

  const [values, setValues] = useState<SettingsBasic>(DEFAULT_SETTINGS_BASIC);
  const [gettingConfig, setGettingConfig] = useState<SettingsBasic>(
    DEFAULT_SETTINGS_BASIC
  );

  useEffect(() => {
    if (getSettings.data && getSettings.data.basics) {
      const data = getSettings.data.basics[0];
      delete data.__typename;
      setValues(data);
      setGettingConfig(data);
    }
  }, [getSettings]);

  const changeValue = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

  const saveContacts = async () => {
    await updateBasic({
      variables: values,
      refetchQueries: [{ query: getBasicsSettingsQuery }],
    }).catch((e) => {
      console.log("error", e);
      cancelContscts();
    });
  };

  const cancelContscts = () => {
    setValues(gettingConfig);
  };

  return (
    <div className="SettingsMain Pages__Wrap">
      <h1 className="Pages__Title">Настройки - Основные</h1>
      <div className="SettingsMain__Wrap">
        <h2 className="SettingsMain__SubTitle">Контакты</h2>
        {BASIC_CONFIG.slice(0, 2).map(({ name, placeholder }) => (
          <SettingsMainInput
            placeholder={placeholder}
            key={name}
            name={name}
            value={values[name]}
            changeValue={changeValue}
          />
        ))}
        <div className="SettingsMain__Social">
          <h2 className="SettingsMain__SubTitle">Социальные сети</h2>
          {BASIC_CONFIG.slice(2, BASIC_CONFIG.length).map(
            ({ name, placeholder }) => (
              <SettingsMainInput
                placeholder={placeholder}
                key={name}
                name={name}
                value={values[name]}
                changeValue={changeValue}
              />
            )
          )}
        </div>
      </div>
      <SettingsMainButton
        disabledSave={JSON.stringify(values) === JSON.stringify(gettingConfig)}
        save={saveContacts}
        cancel={cancelContscts}
      />
    </div>
  );
};
