import React, { useState, useEffect } from "react";
import "./SettingsStaff.scss";
import { SettingsStaffInput } from "../SettingsStaffInput";
import { ADD_STAFF_FIELDS } from "../../../../helpers";
import { useQuery, useMutation } from "react-apollo";
import { getUsersQuery } from "../../../../helpers/gqlQueries";
import {
  addNewUserMutation,
  deleteUserMutation,
  updateUserMutation,
} from "../../../../helpers/gqlMutation";
import { hash } from "bcryptjs";
import { SettingsStaffUserItem } from "../SettingsStaffUserItem";

const defaultAddStaff: AddStaff = {
  name: "",
  login: "",
  password: "",
  confirm: "",
};

const defaultAddStaffErrors: AddStaffErrors = {
  name: false,
  login: false,
  password: false,
  confirm: false,
};

export const SettingsStaff = () => {
  const getUsers = useQuery(getUsersQuery);
  const [addNewUser] = useMutation(addNewUserMutation);
  const [updateUser] = useMutation(updateUserMutation);
  const [delUser] = useMutation(deleteUserMutation);

  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<AddStaff>(defaultAddStaff);
  const [newUserErrors, setNewUserErrors] = useState<AddStaffErrors>(
    defaultAddStaffErrors
  );
  const [loadUpdateRights, setLoadupdateRights] = useState(false);

  useEffect(() => {
    if (getUsers && getUsers.data) {
      setUsers(getUsers.data.users);
    }
  }, [getUsers]);

  const changeFields = (name: string, value: string) => {
    setNewUser({ ...newUser, [name]: value });
    setNewUserErrors(defaultAddStaffErrors);
  };

  const validateField = (name: AddStaffFieldsNames) => {
    if (newUser[name].trim().length > 3) {
      return false;
    }

    setNewUserErrors({ ...newUserErrors, [name]: true });
    return true;
  };

  const addUser = async () => {
    const errors = Object.keys(newUserErrors).reduce(
      (accum: any, value: string) => {
        accum[value] = validateField(value);
        return accum;
      },
      {}
    );

    if (newUser.password !== newUser.confirm) {
      errors.password = true;
      errors.confirm = true;
    }

    setNewUserErrors(errors);

    if (Object.keys(errors).every((error) => !errors[error])) {
      const pass = await hash(newUser.password, 12);
      await addNewUser({
        variables: {
          name: newUser.name,
          login: newUser.login,
          password: pass,
          rights: "manager",
          products: false,
          users: false,
          orders: false,
          settings: false,
        },
        refetchQueries: [
          {
            query: getUsersQuery,
          },
        ],
      })
        .then(() => setNewUser(defaultAddStaff))
        .catch(() => console.log("err"));
    }
  };

  const handleDeleteUser = async (id: string) => {
    await delUser({
      variables: { id },
      refetchQueries: [{ query: getUsersQuery }],
    });
  };

  const handleUpdateRights = async (
    id: string,
    rightsName: string,
    rights: boolean
  ) => {
    setLoadupdateRights(true);
    const updatedUser = users.find((user) => user.id === id);

    const variables = { ...updatedUser, [rightsName]: rights };

    await updateUser({ variables, refetchQueries: [{ query: getUsersQuery }] })
      .catch((e) => console.log(e))
      .finally(() => setLoadupdateRights(false));
  };

  return (
    <div className="SettingsStaff Pages__Wrap">
      <h1 className="Pages__Title">Настройки - Сотрудники</h1>

      <div className="SettingsStaff__Wrap">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="SettingsStaff__Form"
        >
          <div className="SettingsStaff__FieldsWrap">
            {ADD_STAFF_FIELDS.map((field) => (
              <SettingsStaffInput
                key={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={newUser[field.name]}
                err={newUserErrors[field.name]}
                onChange={changeFields}
                validation={validateField}
              />
            ))}
          </div>
          <button className="SettingsStaff__AddButton" onClick={addUser}>
            Добавить сотрудника
          </button>
        </form>
      </div>

      <div className="SettingsStaff__UsersInformation">
        <div className="SettingsStaff__UsersInfo">
          <h3 className="SettingsStaff__InfoTitle">Данные сотрудника</h3>
          <div className="SettingsStaff__Description">
            <p className="SettingsStaff__DescriptionText SettingsStaff__DescriptionText--left">
              Сотрудник
            </p>
            <p className="SettingsStaff__DescriptionText SettingsStaff__DescriptionText--left">
              Логин
            </p>
          </div>
        </div>
        <div className="SettingsStaff__UsersRights">
          <h3 className="SettingsStaff__InfoTitle SettingsStaff__InfoTitle--left">
            Права доступа
          </h3>
          <div className="SettingsStaff__RightsDescr">
            <p className="SettingsStaff__DescriptionText">Товары</p>
            <p className="SettingsStaff__DescriptionText">Заказы</p>
            <p className="SettingsStaff__DescriptionText">Пользователи</p>
            <p className="SettingsStaff__DescriptionText">Настройки</p>
          </div>
        </div>
      </div>

      <ul className="SettingsStaff__UsersList">
        {users.map((user) => (
          <SettingsStaffUserItem
            rights={user.rights}
            key={user.id}
            id={user.id}
            name={user.name}
            login={user.login}
            products={user.products}
            orders={user.orders}
            settings={user.settings}
            users={user.users}
            delUser={handleDeleteUser}
            disabledDel={user.rights === "admin"}
            updateRights={handleUpdateRights}
            loadUpdRights={loadUpdateRights}
          />
        ))}
      </ul>
    </div>
  );
};
