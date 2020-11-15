import { gql } from "apollo-boost";

export const deleteProductMutation = gql`
  mutation deleteProductMutation($uuid: String!) {
    deleteProduct(uuid: $uuid) {
      uuid
    }
  }
`;

export const addProductMutation = gql`
  mutation addProductMutation(
    $uuid: String!
    $title: String!
    $gender: String!
    $descr: String!
    $color: String!
    $price: String!
    $modelParam: String!
    $composition: String!
    $sizes: String!
    $lastPrice: String!
    $type: String!
    $photos: [String!]
    $previewPhoto: String!
    $care: String!
    $timestamp: String!
  ) {
    addProduct(
      uuid: $uuid
      title: $title
      descr: $descr
      color: $color
      gender: $gender
      price: $price
      modelParam: $modelParam
      composition: $composition
      sizes: $sizes
      lastPrice: $lastPrice
      type: $type
      photos: $photos
      previewPhoto: $previewPhoto
      care: $care
      timestamp: $timestamp
    ) {
      id
      uuid
      title
      descr
      gender
      color
      price
      modelParam
      composition
      sizes
      lastPrice
      type
      photos
      previewPhoto
      care
      timestamp
    }
  }
`;

export const updateProductMutation = gql`
  mutation updateProductMutation(
    $uuid: String!
    $id: ID!
    $title: String!
    $descr: String!
    $color: String!
    $price: String!
    $modelParam: String!
    $gender: String!
    $composition: String!
    $sizes: String!
    $lastPrice: String!
    $type: String!
    $photos: [String!]
    $previewPhoto: String!
    $care: String!
    $timestamp: String!
  ) {
    updateProduct(
      uuid: $uuid
      id: $id
      title: $title
      descr: $descr
      gender: $gender
      color: $color
      price: $price
      modelParam: $modelParam
      composition: $composition
      sizes: $sizes
      lastPrice: $lastPrice
      type: $type
      photos: $photos
      previewPhoto: $previewPhoto
      care: $care
      timestamp: $timestamp
    ) {
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
      photos
      previewPhoto
      care
      timestamp
    }
  }
`;

export const addCategoriesMutation = gql`
  mutation addCategoriesMutation($category: String!, $subCategories: String!) {
    addCategories(category: $category, subCategories: $subCategories) {
      id
      category
      subCategories
    }
  }
`;

export const updateCategoriesMutation = gql`
  mutation updateCategoriesMutation(
    $id: ID
    $category: String!
    $subCategories: String!
  ) {
    updateCategories(
      id: $id
      category: $category
      subCategories: $subCategories
    ) {
      id
      category
      subCategories
    }
  }
`;

export const deleteCategoriesMutation = gql`
  mutation deleteCategoriesMutation($id: ID) {
    deleteCategories(id: $id) {
      id
    }
  }
`;

export const addColorMutation = gql`
  mutation addColorMutation($name: String!, $link: String!) {
    addColor(name: $name, link: $link) {
      id
      name
      link
    }
  }
`;

export const updateColorMutation = gql`
  mutation updateColorMutation($id: ID, $name: String!, $link: String!) {
    updateColor(id: $id, name: $name, link: $link) {
      id
      name
      link
    }
  }
`;

export const deleteColorMutation = gql`
  mutation deleteColorMutation($id: ID) {
    deleteColor(id: $id) {
      id
    }
  }
`;

export const updateBasicMutation = gql`
  mutation addBasicsMutation(
    $id: ID
    $phone: String!
    $mail: String!
    $telegram: String!
    $instagram: String!
    $facebook: String!
  ) {
    updateBasic(
      id: $id
      phone: $phone
      mail: $mail
      telegram: $telegram
      instagram: $instagram
      facebook: $facebook
    ) {
      id
      phone
      mail
      telegram
      instagram
      facebook
    }
  }
`;

export const addMoySkladMutation = gql`
  mutation addMoySkladMutation($login: String!, $password: String!) {
    addMoySklad(login: $login, password: $password) {
      id
      login
      password
    }
  }
`;

export const updateMoySkladMutation = gql`
  mutation updateMoySkladMutation(
    $id: ID
    $login: String!
    $password: String!
  ) {
    updateMoySklad(id: $id, login: $login, password: $password) {
      id
      login
      password
    }
  }
`;

export const addPromoMutation = gql`
  mutation addPromoMutation(
    $promoName: String!
    $promoValue: String!
    $promoDisc: String!
  ) {
    addPromo(
      promoName: $promoName
      promoValue: $promoValue
      promoDisc: $promoDisc
    ) {
      id
      promoName
      promoDisc
      promoValue
    }
  }
`;

export const deletePromoMutation = gql`
  mutation deletePromoMutation($id: ID) {
    deletePromo(id: $id) {
      id
    }
  }
`;

export const addSpecCategMutation = gql`
  mutation addSpecCategMutation($name: String!, $products: [String]!) {
    addSpecCateg(name: $name, products: $products) {
      id
      products
      name
    }
  }
`;

export const updateSpecCategMutation = gql`
  mutation updateSpecCategMutation(
    $id: ID
    $name: String!
    $products: [String]!
  ) {
    updateSpecCateg(id: $id, name: $name, products: $products) {
      id
      products
      name
    }
  }
`;

export const deleteSpecCategMutation = gql`
  mutation deleteSpecCategMutation($id: ID) {
    deleteSpecCateg(id: $id) {
      id
    }
  }
`;

export const addNewUserMutation = gql`
  mutation addNewUserMutation(
    $name: String!
    $password: String!
    $login: String!
    $rights: String!
    $products: Boolean!
    $users: Boolean!
    $orders: Boolean!
    $settings: Boolean!
  ) {
    addUser(
      name: $name
      password: $password
      login: $login
      rights: $rights
      products: $products
      users: $users
      orders: $orders
      settings: $settings
    ) {
      id
      name
      password
      rights
      login
      products
      users
      settings
      orders
    }
  }
`;

export const updateUserMutation = gql`
  mutation updateNewUserMutation(
    $id: ID
    $name: String!
    $login: String!
    $products: Boolean!
    $users: Boolean!
    $orders: Boolean!
    $settings: Boolean!
    $rights: String!
  ) {
    updateUser(
      id: $id
      name: $name
      rights: $rights
      login: $login
      products: $products
      users: $users
      orders: $orders
      settings: $settings
    ) {
      id
      name
      login
      rights
      products
      users
      settings
      orders
    }
  }
`;

export const deleteUserMutation = gql`
  mutation deleteUserMutation($id: ID) {
    deleteUser(id: $id) {
      id
    }
  }
`;
