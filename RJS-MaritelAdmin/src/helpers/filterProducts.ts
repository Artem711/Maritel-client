import { splitValue } from "./config";

export const filterProducts = (
  sortByParam: string,
  defaultSortBy: string,
  products: Products[],
  query: string,
  categories?: CategoriesTypes[],
  colors?: ColorTypes[]
) => {
  const searchQuery = query.toLocaleLowerCase().replace(/\(|\)/g, "");
  const body = (product: Products) =>
    `${product.title.toLocaleLowerCase().replace(/\(|\)/g, "")} ${colors
      ?.find((color) => color.id === product.color)
      ?.name.toLocaleLowerCase()}`;
  const callback = (product: Products) => body(product).includes(searchQuery);

  if (sortByParam === defaultSortBy) {
    return [...products]
      .sort((a, b) => +b.timestamp - +a.timestamp)
      .filter(callback);
  }

  return [...products]
    .filter(
      (product) =>
        categories!.find((category) => category.category === sortByParam)
          ?.id === product.type.split(splitValue)[0]
    )
    .sort((a, b) => +b.timestamp - +a.timestamp)
    .filter(callback);
};

export const filterProductsWithoutQuery = (
  sortByParam: string,
  defaultSortBy: string,
  categories: CategoriesTypes[],
  products: ProductsCategory[]
) => {
  if (sortByParam === defaultSortBy) {
    return products;
  }

  return products.filter(
    (product) =>
      categories.find((category) => category.category === sortByParam)?.id ===
      product.type.split(splitValue)[0]
  );
};
