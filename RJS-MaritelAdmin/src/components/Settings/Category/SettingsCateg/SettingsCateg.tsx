import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { createID, splitValue } from "../../../../helpers";
import {
  addCategoriesMutation,
  deleteCategoriesMutation,
  updateCategoriesMutation,
} from "../../../../helpers/gqlMutation";
import {
  getCategoriesQuery,
  getProductsCategoriesQuery,
} from "../../../../helpers/gqlQueries";
import { SettingsCategoryForm } from "../SettingsCategoryForm";
import { SettingsCategoryIcons } from "../SettingsCategoryIcons";
import { SettingsCategoryItem } from "../SettingsCategoryItem";
import { SettingsCategorySubItem } from "../SettingsCategorySubItem";
import "./SettingsCateg.scss";

export const SettingsCateg = () => {
  const [addNewCategory] = useMutation(addCategoriesMutation);
  const [updateCategory] = useMutation(updateCategoriesMutation);
  const [deleteCategory] = useMutation(deleteCategoriesMutation);
  const categories = useQuery(getCategoriesQuery);
  const products = useQuery(getProductsCategoriesQuery);

  const [productsTypes, setProductsTypes] = useState<ProductsTypes[]>([]);

  const [newCategory, setNewCategory] = useState("");
  const [newCategoryErr, setNewCategoryErr] = useState(false);
  const [loadingAddCategory, setLoadingAddCategory] = useState(false);

  const [loadCategories, setLoadCategories] = useState<CategoriesTypes[]>([]);

  const [editingId, setEditingId] = useState("");
  const [editCategoryErr, setEditCategoryErr] = useState(false);
  const [editCategory, setEditCategory] = useState("");

  const [newSubCategory, setNewSubCategory] = useState("");
  const [newSubId, setEditingSubId] = useState("");

  const [editSubCategoryId, setEditSubCategoryId] = useState("");
  const [startEditSubValue, setStartEditSubValue] = useState("");
  const [editSubCategory, setEditSubCategory] = useState("");

  const setNewCateg = (value: string) => {
    setNewCategory(value);
    setNewCategoryErr(false);
  };

  const editCateg = (value: string) => {
    setEditCategory(value);
    setEditCategoryErr(false);
  };

  const unicValidate = (value: string) => {
    if (!value.trim().length) {
      return true;
    }

    if (loadCategories.some((categ) => categ.category === value.trim())) {
      return true;
    }

    return false;
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (unicValidate(newCategory)) {
      setNewCategoryErr(true);
      return;
    }

    setLoadingAddCategory(true);
    await addNewCategory({
      variables: {
        category: newCategory,
        subCategories: JSON.stringify([]),
      },
      refetchQueries: [
        {
          query: getCategoriesQuery,
        },
      ],
    }).then(() => {
      setLoadingAddCategory(false);
      setNewCategory("");
    });
  };

  const handleStartEditing = (id: string, category: string) => {
    setEditingId(id);
    setEditCategory(category);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loadCategories.find((categ) => categ.id === editingId)?.category !==
        editCategory &&
      unicValidate(editCategory)
    ) {
      setEditCategoryErr(true);
      return;
    }

    setLoadingAddCategory(true);
    const subs = JSON.stringify(
      loadCategories.find((categ) => categ.id === editingId)?.subCategories
    );

    await updateCategory({
      variables: {
        id: editingId,
        category: editCategory,
        subCategories: subs,
      },
      refetchQueries: [
        {
          query: getCategoriesQuery,
        },
      ],
    }).then(() => {
      setLoadingAddCategory(false);
      setEditingId("");
      setEditCategory("");
    });
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory({
      variables: { id },
      refetchQueries: [{ query: getCategoriesQuery }],
    });
  };

  const handleSaveSubCategory = async (id: string) => {
    if (!newSubCategory.length) {
      handleCancelAddSub();
      return;
    }

    const subs = JSON.stringify([
      { id: createID([]), subs: newSubCategory },
      ...(loadCategories.find((category) => category.id === id)
        ?.subCategories || []),
    ]);

    await updateCategory({
      variables: {
        id,
        category: loadCategories.find((category) => category.id === id)
          ?.category,
        subCategories: subs,
      },
      refetchQueries: [
        {
          query: getCategoriesQuery,
        },
      ],
    }).then(() => {
      handleCancelAddSub();
    });
  };

  const handleUpdateSubCategory = async (id: string) => {
    const subs = JSON.stringify(
      loadCategories
        .find((categ) => categ.id === id)
        ?.subCategories.map((categ) => {
          if (categ.id === startEditSubValue) {
            return { ...categ, subs: editSubCategory };
          }

          return categ;
        })
    );

    await updateCategory({
      variables: {
        id,
        category: loadCategories.find((categ) => categ.id === editSubCategoryId)
          ?.category,
        subCategories: subs,
      },
      refetchQueries: [
        {
          query: getCategoriesQuery,
        },
      ],
    }).then(() => handleCancelSubEditing());
  };

  const handleCancelAddSub = (id?: string) => {
    setEditingSubId("");
    setNewSubCategory("");
  };

  const handleStartSubEditing = (id: string, category: string, i: string) => {
    setEditSubCategoryId(id);
    setEditSubCategory(category);
    setStartEditSubValue(i);
  };

  const handleCancelSubEditing = () => {
    setEditSubCategoryId("");
    setEditSubCategory("");
    setStartEditSubValue("");
  };

  const handleRemoveSubCateg = async (categId: string, subCategId: string) => {
    const subs = JSON.stringify(
      loadCategories
        .find((categ) => categ.id === categId)
        ?.subCategories.filter((categ) => categ.id !== subCategId)
    );

    await updateCategory({
      variables: {
        id: categId,
        category: loadCategories.find((categ) => categ.id === categId)
          ?.category,
        subCategories: subs,
      },
      refetchQueries: [{ query: getCategoriesQuery }],
    });
  };

  useEffect(() => {
    if (categories && categories.data && categories.data.categories) {
      const categ = categories.data.categories.map(
        (categories: CategoriesFromDB) => ({
          ...categories,
          subCategories: JSON.parse(categories.subCategories),
        })
      );
      setLoadCategories(
        [...categ].sort((a: CategoriesTypes, b: CategoriesTypes) =>
          a.category.localeCompare(b.category)
        )
      );
    }
  }, [categories]);

  useEffect(() => {
    if (products && products.data) {
      setProductsTypes(products.data.products);
    }
  }, [products]);

  return (
    <div className="SettingsCateg Pages__Wrap">
      <h1 className="Pages__Title">Настройки - Категории</h1>
      <div className="SettingsCateg__Wrap">
        <SettingsCategoryForm
          handleAddCategory={handleAddCategory}
          newCategory={newCategory}
          setNewCategory={setNewCateg}
          error={newCategoryErr}
          loadingAddCategory={loadingAddCategory}
          btnText="Добавить"
          dis={newCategoryErr}
        />
      </div>
      {true && loadCategories.length > 0 && (
        <ul className="SettingsCateg__List">
          {loadCategories.map((category) => (
            <React.Fragment key={category.category}>
              <li>
                {editingId !== category.id ? (
                  <div className="SettingsCateg__Item">
                    <SettingsCategoryItem
                      category={category.category}
                      id={category.id}
                      handleStartEditing={handleStartEditing}
                    />
                    <SettingsCategoryIcons
                      setEditingSubId={setEditingSubId}
                      handleDeleteCategory={handleDeleteCategory}
                      id={category.id}
                      img1="images/settings/categories/add.svg"
                      img2="images/settings/categories/trash.svg"
                      disabled={productsTypes.some(
                        (prod) => prod.type.split(splitValue)[0] === category.id
                      )}
                    />
                  </div>
                ) : (
                  <div className="SettingsCateg__EditWrap">
                    <SettingsCategoryForm
                      handleAddCategory={handleSaveCategory}
                      newCategory={editCategory}
                      setNewCategory={editCateg}
                      loadingAddCategory={loadingAddCategory}
                      btnText="Обновить"
                      error={editCategoryErr}
                    />
                  </div>
                )}
              </li>
              {newSubId === category.id && (
                <div className="SettingsCateg__AddSubWrap">
                  <input
                    type="text"
                    className="SettingsCateg__AddSub"
                    placeholder="Новая подкатегория"
                    value={newSubCategory}
                    onChange={(e) => setNewSubCategory(e.target.value)}
                  />
                  <SettingsCategoryIcons
                    setEditingSubId={handleSaveSubCategory}
                    handleDeleteCategory={handleCancelAddSub}
                    id={category.id}
                    img1="images/settings/categories/save.svg"
                    img2="images/settings/categories/cancel.svg"
                    disabled={false}
                  />
                </div>
              )}
              {category.subCategories.length > 0 && (
                <ul className="SettingsCateg__SubList">
                  {category.subCategories.map((subCateg) => (
                    <li key={subCateg.id}>
                      {editSubCategoryId === category.id &&
                      startEditSubValue === subCateg.id ? (
                        <div className="SettingsCateg__SubListWrap">
                          <input
                            type="text"
                            value={editSubCategory}
                            className="SettingsCateg__EditSub"
                            onChange={(e) => setEditSubCategory(e.target.value)}
                          />
                          <SettingsCategoryIcons
                            setEditingSubId={handleUpdateSubCategory}
                            handleDeleteCategory={handleCancelSubEditing}
                            id={category.id}
                            img1="images/settings/categories/save.svg"
                            img2="images/settings/categories/cancel.svg"
                            disabled={false}
                          />
                        </div>
                      ) : (
                        <SettingsCategorySubItem
                          subs={subCateg.subs}
                          categId={category.id}
                          subId={subCateg.id}
                          handleRemoveSubCateg={handleRemoveSubCateg}
                          handleStartSubEditing={handleStartSubEditing}
                          dis={productsTypes.some(
                            (prod) =>
                              prod.type.split(splitValue)[1] === subCateg.id
                          )}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};
