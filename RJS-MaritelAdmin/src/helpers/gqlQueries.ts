import { gql } from "apollo-boost";

export const productsQuery = gql`
  query productsQuery {
    products {
      id
      uuid
      title
      descr
      color
      price
      gender
      modelParam
      composition
      sizes
      lastPrice
      type
      care
      photos
      previewPhoto
      timestamp
    }
  }
`;

export const productQuery = gql`
  query productQuery($uuid: String!) {
    product(uuid: $uuid) {
      id
      uuid
      title
      descr
      color
      price
      gender
      modelParam
      composition
      sizes
      lastPrice
      care
      type
      photos
      previewPhoto
      timestamp
    }
  }
`;

export const relatedProductsQuery = gql`
  query productsQuery {
    products {
      id
      uuid
      title
      color
      previewPhoto
    }
  }
`;

export const photoProductsToDel = gql`
  query photoProductsToDel($uuid: String!) {
    product(uuid: $uuid) {
      photos
    }
  }
`;

export const getUserQuery = gql`
  query getUserQuery($id: ID) {
    user(id: $id) {
      id
      name
      rights
      login
      products
      orders
      settings
      users
    }
  }
`;

export const getUsersQuery = gql`
  query getUsersQuery {
    users {
      id
      name
      rights
      login
      products
      orders
      settings
      users
    }
  }
`;

export const getProductsUuID = gql`
  query getProductsUuID {
    products {
      uuid
    }
  }
`;

export const getCategoriesQuery = gql`
  query getCategoriesQuery {
    categories {
      id
      category
      subCategories
    }
  }
`;

export const getProductsCategoriesQuery = gql`
  query getProductsCategoriesQuery {
    products {
      id
      type
    }
  }
`;

export const getColorsQuery = gql`
  query getColorsQuery {
    colors {
      id
      name
      link
    }
  }
`;

export const getProductsColorsQuery = gql`
  query getProductsColorsQuery {
    products {
      id
      color
    }
  }
`;

export const getBasicsSettingsQuery = gql`
  query getBasicsSettingsMutation {
    basics {
      id
      phone
      mail
      telegram
      instagram
      facebook
    }
  }
`;

export const getMoySkladData = gql`
  query getMoySkladData($id: ID) {
    getSklad(id: $id) {
      id
      login
      password
    }
  }
`;

export const getPromoQuery = gql`
  query getPromoQuery {
    getAllPromo {
      id
      promoName
      promoValue
      promoDisc
    }
  }
`;

export const productOptionCategoryQuery = gql`
  query productOptionCategoryQuery {
    products {
      id
      previewPhoto
      title
      type
    }
  }
`;

export const getSpecCategQuery = gql`
  query getSpecCategQuery {
    getSpecCateg {
      id
      name
      products
    }
  }
`;
