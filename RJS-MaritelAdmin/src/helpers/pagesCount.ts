export const countPages = (
  currentPerPage: string,
  filteredProducts: Products[]
) => Math.ceil(filteredProducts.length / +currentPerPage);
