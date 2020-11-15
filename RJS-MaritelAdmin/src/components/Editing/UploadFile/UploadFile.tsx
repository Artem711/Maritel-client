import React, { useState, useContext } from "react";
import "./UploadFile.scss";
import { maxPhotos } from "../../../helpers";
import cn from "classnames";
import { EditingContext } from "../../../editingContext";

interface Props {
  photos: MyFiles[];
  setPhotos: (photos: MyFiles[]) => void;
  previewPhoto: string;
  name: string;
  previewError: boolean;
}

export const UploadFile: React.FC<Props> = ({
  photos,
  setPhotos,
  previewPhoto,
  name,
  previewError,
}) => {
  const { handleError, handleChangeFields } = useContext(EditingContext);
  const [file, setFile] = useState<File | null>(null);

  const handleLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    e.preventDefault();
    if (files && files[0]) {
      setFile(files[0]);
      handleReadFile(files[0]);
    }
  };

  const handleReadFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const readerRes = reader.result;
        setPhotos([...photos, { link: readerRes, file }]);
        setFile(null);
        deletePreviewPhoto();
      }
    };
  };

  const setPreviewPhoto = (photo: string) => {
    handleChangeFields(photo, name);
    handleError(false, name);
  };

  const deletePreviewPhoto = () => {
    handleChangeFields("", name);
    handleError(true, name);
  };

  const deletePhotoFromForm = async (photo: string) => {
    deletePreviewPhoto();
    setPhotos(photos.filter((photoToDel) => photoToDel.link !== photo));
  };

  const check = (url: string) => url === previewPhoto;

  const ErrorPhoto = (link: string) => {
    setPhotos(
      photos.map((ph) => {
        if (ph.link === link) {
          return { ...ph, link: "" };
        }

        return ph;
      })
    );
    setTimeout(
      () =>
        setPhotos(
          photos.map((ph) => {
            if (!ph.link) {
              return { ...ph, link };
            }

            return ph;
          })
        ),
      0
    );
  };

  return (
    <>
      <div className="UploadFile__Wrap">
        <div className="UploadFile__Wrapper">
          <form
            encType="multipart/form-data"
            action="/upload"
            method="post"
            className="UploadFile"
          >
            <label htmlFor="filedata">
              <input
                type="file"
                name="uploaded_file"
                id="filedata"
                onChange={handleLoadFile}
                className="UploadFile__Input"
                disabled={photos.length === maxPhotos}
              />
              <span
                className={cn({
                  UploadFile__Custom: true,
                  "UploadFile__Custom--disabled": photos.length === maxPhotos,
                  "UploadFile__Custom--error":
                    (previewError && !previewPhoto && !photos.length) ||
                    (!previewPhoto && photos.length),
                  "UploadFile__Custom--success":
                    !previewError && previewPhoto && photos.length,
                })}
                data-title={`${
                  photos.length && !previewPhoto && !file?.name
                    ? "Выберите фото для превью или загрузите еще"
                    : file?.name || "Загрузите ваше фото"
                }`}
              />
            </label>
          </form>
        </div>

        <div className="UploadFile__Stub">
          <img src="images/edit/emptyPhotos.svg" alt="" />
        </div>

        {photos.length > 0 && (
          <>
            <ul className="UploadFile__List">
              {photos.map((photo) => (
                <li
                  key={photo.link}
                  className={cn({
                    UploadFile__Item: true,
                    "UploadFile__Item--preview": check(photo.link),
                  })}
                >
                  <img
                    src={photo.link}
                    alt="model"
                    className="UploadFile__Photo"
                    onError={() =>
                      setTimeout(() => ErrorPhoto(photo.link), 400)
                    }
                    onClick={() => setPreviewPhoto(photo.link)}
                  />
                  <img
                    src="images/edit/edit.svg"
                    alt="delete"
                    className="UploadFile__Delete"
                    onClick={() => deletePhotoFromForm(photo.link)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
