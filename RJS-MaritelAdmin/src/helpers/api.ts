const UPLOAD_URL = process.env.REACT_APP_UPLOAD_FILE;

export async function postData(formData: any) {
  console.log(UPLOAD_URL, formData);
  const res = await fetch(`${UPLOAD_URL}`, {
    method: "POST",
    headers: {
      ContentType: "text/html; charset: utf-8",
    },
    body: formData,
  });

  const json = await res.json();
  return json;
}

export const deletePhotoS3 = async (photo: string, id: string) => {
  const res = await fetch(`${process.env.REACT_APP_DELETE_PHOTOS3}`, {
    method: "POST",
    body: JSON.stringify({ photo, id }),
  });
  const json = await res.json();

  return json;
};

export const checkConnect = async (login: string, password: string) => {
  const res = await fetch(
    `https://cors-anywhere.herokuapp.com/online.moysklad.ru/api/remap/1.1/entity/product`,
    {
      headers: {
        Authorization: `basic ${b64EncodeUnicode(`${login}:${password}`)}`,
        header: "X-RateLimit-Remaining",
      },
    }
  );

  const json = await res.json();

  return json;
};

function b64EncodeUnicode(str: string) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(
      _,
      p1
    ) {
      return String.fromCharCode(+`0x${p1}`);
    })
  );
}
