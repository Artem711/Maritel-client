import { splitValue } from ".";

export const getType = (
  categories: CategoriesTypes[],
  type: string,
  callbackId: (categ: CategoriesTypes) => boolean,
  callbackSubId: (categ: SubCateg) => boolean
) => {
  if (type.split(splitValue).length === 2) {
    return `${categories.find(callbackId)?.category}${splitValue}${
      categories.find(callbackId)?.subCategories.find(callbackSubId)?.subs
    }`;
  } else {
    return `${categories.find(callbackId)?.category}`;
  }
};
