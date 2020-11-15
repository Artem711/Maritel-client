import { createID } from "./createId";

export const cloneObject = (clone: Products, newTitle: string, prodsID: string[]) => ({
  title: newTitle,
  descr: clone.descr,
  color: clone.color,
  price: clone.price,
  modelParam: clone.modelParam,
  composition: clone.composition,
  sizes: clone.sizes,
  gender: clone.gender,
  lastPrice: clone.lastPrice,
  type: clone.type,
  photos: [],
  care: clone.care,
  previewPhoto: "",
  timestamp: clone.timestamp,
  uuid: createID(prodsID),
});

export const getTitle = (title: string) => {
  if (!title.includes("(копия)")) {
    return `${title} (копия)`;
  } else {
    return title;
  }
};
