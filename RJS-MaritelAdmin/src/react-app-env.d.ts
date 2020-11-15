/// <reference types="react-scripts" />

interface Sizes {
  size: string;
  articul: string;
  stock: string;
}

interface Products {
  uuid: string;
  id: string;
  title: string;
  descr: string;
  color: string;
  price: string;
  modelParam: string;
  gender: string;
  care: string;
  composition: string;
  sizes: string;
  lastPrice: string;
  type: string;
  photos: string[];
  previewPhoto: string;
  timestamp: string;
}

interface LocalProduct {
  uuid: string;
  title: string;
  descr: string;
  color: string;
  price: string;
  modelParam: string;
  gender: string;
  care: string;
  composition: string;
  sizes: string;
  lastPrice: string;
  type: string;
  photos: string[];
  previewPhoto: string;
  timestamp: string;
}

interface ProductsPage {
  id: string;
  title: string;
  type: string;
  previewPhoto: string;
  price: string;
  lastPrice: string;
}

interface AdminNav {
  [key: string]: AdminNavItem;
}

interface AdminNavItem {
  name: string;
  img: string;
  link: string;
}

interface FieldsValidate {
  [key: string]: boolean;
}

interface FieldsParams {
  title: string;
  descr: string;
  color: string;
  price: string;
  modelParam: string;
  composition: string;
  lastPrice: string;
  type: string;
  gender: string;
  previewPhoto: string;
  care: string;
  [key: string]: string;
}

interface ErrorsField {
  title: boolean;
  descr: boolean;
  color: boolean;
  price: boolean;
  modelParam: boolean;
  composition: boolean;
  gender: boolean;
  sizes: boolean;
  type: boolean;
  care: boolean;
  previewPhoto: boolean;
  [key: string]: boolean;
}

interface User {
  id: string;
  name: string;
  rights: string;
  products: boolean;
  orders: boolean;
  users: boolean;
  settings: boolean;
  login: string;
}

interface FieldsEditingText {
  placeholder: string;
  name: string;
}

interface RelatedProd {
  id: string;
  previewPhoto: string;
  color: string;
  title: string;
  uuid: string;
}

interface ExtendedTypes {
  name: string;
  subTypes?: string[];
}

interface CategoriesTypes {
  id: string;
  category: string;
  subCategories: SubCateg[];
}

interface CategoriesFromDB {
  id: string;
  category: string;
  subCategories: string;
}

interface SettingsPage {
  name: string;
  img: string;
  link: string;
}

interface SubCateg {
  id: string;
  subs: string;
}

interface EditCategoryName {
  name: string;
  value: string;
}

interface ProductsTypes {
  id: string;
  type: string;
}

interface ColorTypes {
  id: string;
  name: string;
  link: string;
}

interface ProductsColors {
  id: string;
  color: string;
}

interface SettingsBasic {
  phone: string;
  mail: string;
  instagram: string;
  facebook: string;
  telegram: string;
  [key: string]: string;
}

interface SettingsBasicErr {
  phone: boolean;
  mail: boolean;
  instagram: boolean;
  facebook: boolean;
  telegram: boolean;
  [key: string]: boolean;
}

interface SettingsBasicConf {
  placeholder: string;
  name: string;
}

interface SettingsServices {
  login: string;
  password: string;
}

type promo = "percent" | "grn";

interface SettingsPromo {
  promoName: string;
  promoValue: string;
  promoDisc: string;
  id: string;
}

interface MyFiles {
  link: string;
  file: File | null;
}

interface LoadPhotos {
  oldLink: string;
  link: string;
}

interface ProductsCategory {
  id: string;
  previewPhoto: string;
  title: string;
  type: string;
}

interface SpecProdsCategory {
  id: string;
  name: string;
  products: string[];
}

type VisibleProds = "Все" | "Добавленные" | "Недобавленные";

interface AddStaff {
  name: string;
  login: string;
  password: string;
  confirm: string;
  [key: string]: string;

}
interface AddStaffErrors {
  name: boolean;
  login: boolean;
  password: boolean;
  confirm: boolean;
  [key: string]: boolean;
}

type AddStaffFieldsNames = "name" | "login" | "password" | "confirm" | string;

interface AddStaffFields {
  name: AddStaffFieldsNames;
  type: string;
  placeholder: string;
}

interface HandlerErrors {
  [key: string]: boolean;
}
