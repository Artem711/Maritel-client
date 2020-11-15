import React, { useCallback, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Redirect, useLocation } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { EditingContext } from "../../editingContext";
import * as helpers from "../../helpers";
import * as mutatuions from "../../helpers/gqlMutation";
import * as queries from "../../helpers/gqlQueries";
import * as Editing from "../Editing";
import { EditingGender } from "../Editing/EditingGender";
import { EditingRelated } from "../Editing/EditingRelated";
import { ProdSpinner } from "../Spinners";
import "./EditingPage.scss";
import { postData } from "../../helpers";

export const EditingPage: React.FC = () => {
  const {
    fieldsParams,
    errorsField,
    handleChangeFields,
    handleError,
    validation,
    setFieldsParams,
    choosenSizes,
    setChoosenSizes,
    setErrorsField,
  } = useContext(EditingContext);

  const {
    setBackgroundCover,
    bachgroundCover,
    userInfo,
    categories,
  } = useContext(AppContext);

  const location = useLocation();
  const isNewProduct = location.pathname.startsWith("/new");
  const prodId = location.pathname.split("/").filter((name) => name)[1];
  const { data } = useQuery(queries.productQuery, {
    variables: { uuid: prodId },
  });
  const products = useQuery(queries.relatedProductsQuery);
  const productsUuid = useQuery(queries.getProductsUuID);
  const [addProduct] = useMutation(mutatuions.addProductMutation);
  const [updateProduct] = useMutation(mutatuions.updateProductMutation);

  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const [editingVersion, setEditingVersion] = useState("");
  const [relatedSearch, setRelatedSearch] = useState("");
  const [relatedProd, setRelatedProd] = useState<RelatedProd[]>([]);
  const [unicId, setUnicId] = useState("");

  const [myFiles, setMyFiles] = useState<MyFiles[]>([]);

  useEffect(() => {
    if (!isNewProduct && data && data.product) {
      const product: Products = data.product;
      const newParams = {
        uuid: product.uuid,
        title: product.title,
        descr: product.descr,
        color: product.color,
        price: product.price,
        modelParam: product.modelParam,
        composition: product.composition,
        lastPrice: product.lastPrice,
        care: product.care,
        type: product.type,
        gender: product.gender,
        previewPhoto: product.previewPhoto,
      };

      setTimestamp(product.timestamp);
      setEditingVersion(
        JSON.stringify({
          ...newParams,
          photos: product.photos,
          sizes: JSON.parse(product.sizes),
        })
      );
      setChoosenSizes(JSON.parse(product.sizes));
      setMyFiles(
        product.photos.map((photo) => ({
          link: photo,
          file: null,
        }))
      );
      setFieldsParams(newParams);
      setRelatedSearch(product.title);
      setUnicId(newParams.uuid);
    }
  }, [data, isNewProduct, setChoosenSizes, setFieldsParams, userInfo.id]);

  const isOk = () => {
    let isError = false;
    const errors = Object.keys(errorsField).reduce(
      (accum: any, value: string) => {
        if (value !== "previewPhoto" && value !== "sizes") {
          accum[value] = validation(value);
        }
        return accum;
      },
      {}
    );

    errors.previewPhoto = !fieldsParams.previewPhoto;
    errors.sizes =
      choosenSizes.length === 0 ||
      !choosenSizes.every((size) => size.articul.length >= 1);
    errors.lastPrice = false;

    setErrorsField(errors);

    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        isError = true;
        return;
      }
    });

    if (!myFiles.length || isError) {
      return;
    } else {
      const sizes = JSON.stringify(choosenSizes);
      setBackgroundCover(true);

      if (isNewProduct) {
        const variables: LocalProduct = {
          ...fieldsParams,
          sizes,
          photos: [],
          timestamp: `${new Date().getTime()}`,
          uuid: helpers.createID(
            productsUuid.data.products.map(
              (prod: { uuid: string }) => prod.uuid
            )
          ),
        };
        addProd(variables);
      } else {
        const variables: Products = {
          ...fieldsParams,
          id: prodId,
          sizes,
          photos: [],
          timestamp,
          uuid: unicId,
        };
        updateProd(variables);
      }
    }
  };

  const handleCancel = () => {
    setCancel(true);
  };

  const load = async (formData: FormData) => {
    return await postData(formData);
  };

  const addProd = async (variables: LocalProduct) => {
    const loadPhotos: LoadPhotos[] = [];

    for (const key of myFiles) {
      if (key.file) {
        const formData = new FormData();
        formData.set("file", key.file);
        loadPhotos.push({ link: await load(formData), oldLink: key.link });
      }
    }

    const preview = myFiles.find(
      (file) => file.link === variables.previewPhoto
    );

    if (preview && preview.link) {
      const previewPhoto = loadPhotos.find((ph) => ph.oldLink === preview.link)
        ?.link;

      await addProduct({
        variables: {
          ...variables,
          photos: loadPhotos.map((ph) => ph.link),
          previewPhoto,
        },
        refetchQueries: [
          {
            query: queries.productsQuery,
          },
        ],
      })
        .then(() => {
          setRelatedSearch("");
          setMyFiles([]);
          setCancelSuccess(true);
        })
        .catch((err) => console.log("error cant to send", err));
    }
  };

  const updateProd = async (variables: Products) => {
    const loadPhotos: LoadPhotos[] = [];

    for (const key of myFiles) {
      if (key.file) {
        const formData = new FormData();
        formData.set("file", key.file);
        loadPhotos.push({ link: await load(formData), oldLink: key.link });
      } else {
        loadPhotos.push({ link: key.link, oldLink: "" });
      }
    }

    let preview = variables.previewPhoto.startsWith(`https://`)
      ? variables.previewPhoto
      : loadPhotos.find((file) => file.oldLink === variables.previewPhoto)
          ?.link;

    await updateProduct({
      variables: {
        ...variables,
        photos: loadPhotos.map((ph) => ph.link),
        previewPhoto: preview,
      },
    })
      .then(() => {
        setCancelSuccess(true);
      })
      .catch(() => console.log("err"));
  };

  const addMore = useCallback(() => {
    setBackgroundCover(false);
    setCancelSuccess(false);
    setMyFiles([]);
    setChoosenSizes([]);
    setErrorsField(helpers.DEFAULT_FIELDS_ERRORS);
    setFieldsParams(helpers.DEFAULT_FIELDS_PARAMS);
  }, [
    setBackgroundCover,
    setCancelSuccess,
    setMyFiles,
    setChoosenSizes,
    setErrorsField,
    setFieldsParams,
  ]);

  const continueEdit = () => {
    setBackgroundCover(false);
    setCancelSuccess(false);
  };

  useEffect(() => {
    if (products && products.data && products.data.products && !isNewProduct) {
      setRelatedProd(
        products.data.products.filter((prod: Products) => prod.uuid !== prodId)
      );
    } else if (products && products.data && products.data.products) {
      setRelatedProd(products.data.products);
    }
  }, [
    products,
    fieldsParams,
    relatedSearch,
    location.pathname,
    isNewProduct,
    prodId,
  ]);

  useEffect(() => {
    return () => {
      addMore();
    };
  }, [userInfo.id, addMore]);

  return (
    <>
      {bachgroundCover && <ProdSpinner />}
      {cancel && <Redirect to="/products" />}
      {isNewProduct && cancelSuccess && (
        <Editing.PopupSuccessNew
          addMore={addMore}
          title="Товар успешно добавлен"
          buttonText="Добавить еще"
          link="/new"
        />
      )}
      {!isNewProduct && cancelSuccess && (
        <>
          <Editing.PopupSuccessNew
            addMore={continueEdit}
            title="Товар успешно изменен"
            buttonText="Ок"
            link={location.pathname}
          />
        </>
      )}
      <div className="EditingPage Pages__Wrap">
        <h1 className="Pages__Title">
          {isNewProduct ? "Добавление товара" : "Редактирование товара"}
        </h1>
        <div className="EditingPage__Fields">
          <EditingRelated relatedProd={relatedProd} title={relatedSearch} />
          <Editing.EditingInput
            placeholder="Название"
            value={fieldsParams.title}
            name="title"
            error={errorsField.title}
            related={setRelatedSearch}
          />
          <EditingGender
            name="gender"
            value={fieldsParams.gender}
            error={errorsField.gender}
          />
          <Editing.EditingSelect
            currentValue={fieldsParams.type}
            name="type"
            error={errorsField.type}
          />
          <Editing.UploadFile
            photos={myFiles}
            setPhotos={setMyFiles}
            previewPhoto={fieldsParams.previewPhoto}
            name="previewPhoto"
            previewError={errorsField.previewPhoto}
          />
          <Editing.EditingPrices
            price={fieldsParams.price}
            lastPrice={fieldsParams.lastPrice}
            namePrice="price"
            nameLastPrice="lastPrice"
            errorPrice={errorsField.price}
          />
          <Editing.EditingColros
            currentColor={fieldsParams.color}
            error={errorsField.color}
            name="color"
          />
          {categories.find(
            (categ) =>
              categ.id === fieldsParams.type.split(helpers.splitValue)[0]
          )?.category !== "Обувь" ? (
            <Editing.EditingSizes
              name="sizes"
              error={errorsField.sizes}
              config={helpers.SIZES_CONFIG}
            />
          ) : (
            <Editing.EditingSizes
              name="sizes"
              error={errorsField.sizes}
              config={helpers.SHOES_SIZES_CONFIG}
            />
          )}

          {helpers.FIELDS_EDITING_TEXT.map(({ placeholder, name }) => (
            <Editing.EditingText
              key={name}
              placeholder={placeholder}
              value={fieldsParams[name]}
              name={name}
              setValue={handleChangeFields}
              setError={handleError}
              error={errorsField[name]}
              validation={validation}
            />
          ))}
        </div>
        {isNewProduct ? (
          <Editing.EditingNewProductButtons
            isOk={isOk}
            handleCancel={handleCancel}
          />
        ) : (
          <Editing.EditingEditProductButtons
            isOk={isOk}
            prodId={prodId}
            setCancel={setCancel}
            disabled={
              editingVersion ===
              JSON.stringify({ ...fieldsParams, myFiles, sizes: choosenSizes })
            }
          />
        )}
      </div>
    </>
  );
};
