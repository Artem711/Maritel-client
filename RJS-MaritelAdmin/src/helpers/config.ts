export const FieldConfig = {};

export const FIELDS_EDITING_TEXT: FieldsEditingText[] = [
  {
    placeholder: "Описание",
    name: "descr",
  },
  {
    placeholder: "Параметры модели",
    name: "modelParam",
  },
  {
    placeholder: "Уход за изделием",
    name: "care",
  },
  {
    placeholder: "Состав",
    name: "composition",
  },
];

export const ADMIN_PANEL_NAV: AdminNav = {
  products: {
    name: "Товары",
    img: "images/nav/products.svg",
    link: "/products",
  },
  users: {
    name: "Пользователи",
    img: "images/nav/users.svg",
    link: "/users",
  },
  orders: {
    name: "Заказы",
    img: "images/nav/orders.svg",
    link: "/orders",
  },
  settings: {
    name: "Настройки",
    img: "images/nav/settings.svg",
    link: "/settings",
  },
};

export const PRODUCTS_FIELDS = [
  {
    filedName: "descr",
    placeholder: "Описание",
    error: "Заполните правильно поле",
  },
  {
    filedName: "sizes",
    placeholder: "Описание",
    error: "Заполните правильно поле",
  },
  {
    filedName: "modelParam",
    placeholder: "Описание",
    error: "Заполните правильно поле",
  },
  {
    filedName: "care",
    placeholder: "Описание",
    error: "Заполните правильно поле",
  },
  {
    filedName: "composition",
    placeholder: "Описание",
    error: "Заполните правильно поле",
  },
];

export const SIZES_CONFIG: string[] = [
  "XXXS",
  "XXS",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
  "XXS-XS",
  "XS-S-M",
  "XS-S-M-L",
  "S-M",
  "L-XL",
  "L-XL-XXL",
  "XL-XXL",
];

export const SHOES_SIZES_CONFIG: string[] = [
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
];

export const GENDER = ["Мужской", "Женский"];

export const DEFAULT_FIELDS_PARAMS = {
  title: "",
  descr: "",
  color: "",
  price: "",
  modelParam: "",
  composition: "",
  lastPrice: "",
  gender: "",
  type: "",
  care: "",
  previewPhoto: "",
};

export const DEFAULT_FIELDS_ERRORS = {
  title: false,
  descr: false,
  color: false,
  price: false,
  modelParam: false,
  gender: false,
  composition: false,
  lastPrice: false,
  sizes: false,
  type: false,
  care: false,
  previewPhoto: false,
};

export const PER_PAGE = ["10", "20", "30"];

export const defaultSortBy = "Все товары";
export const defaultPage = "1";
export const defaultStatus = "Все";
export const defaultPerPage = "10";
export const searchQuery = "query";
export const sortBy = "sortBy";
export const page = "page";
export const productsPerPage = "perPage";
export const status = "status";
export const sortCategory = "sortCategory";

export const splitValue = " / ";
export const maxPhotos = 4;
export const shoesMark = "Обувь";

export const SETTINGS_PAGE: SettingsPage[] = [
  {
    name: "Основные",
    img: "images/settings/settings.svg",
    link: "/settings/basic",
  },
  {
    name: "Категории",
    img: "images/settings/category.svg",
    link: "/settings/category",
  },
  {
    name: "Цвета",
    img: "images/settings/colors.svg",
    link: "/settings/colors",
  },
  {
    name: "Сервисы",
    img: "images/settings/services.svg",
    link: "/settings/services",
  },
  {
    name: "Промокоды",
    img: "images/settings/promo.svg",
    link: "/settings/promo",
  },
  {
    name: "Заказы",
    img: "images/settings/orders.svg",
    link: "/settings/orders",
  },
  {
    name: "Баннера",
    img: "images/settings/banners.svg",
    link: "/settings/banners",
  },
  {
    name: "Сотрудники",
    img: "images/settings/staff.svg",
    link: "/settings/staff",
  },
];

export const DEFAULT_SETTINGS_BASIC: SettingsBasic = {
  phone: "",
  mail: "",
  instagram: "",
  facebook: "",
  telegram: "",
};

export const DEFAULT_SETTINGS_BASIC_ERROR: SettingsBasicErr = {
  phone: false,
  mail: false,
  instagram: false,
  facebook: false,
  telegram: false,
};

export const TELEGRAM_REGEXP = /https?:\/\/t\.me\/.+/g;
export const FACEBOOK_REGEXP = /https?:\/\/www\.facebook\.com\/.+/g;
export const INSTAGRAM_REGEXP = /https?:\/\/www.instagram.com\/.+/g;
export const PHONE_REGEXP = /\+38 \(\d{3}\) \d{2}-\d{2}-\d{3}/g;
// eslint-disable-next-line
export const EMAIL_REGEXP = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

export const BASIC_CONFIG: SettingsBasicConf[] = [
  {
    placeholder: "Телефон: +38 (123) 45-67-890",
    name: "phone",
  },
  {
    placeholder: "E-mail",
    name: "mail",
  },
  {
    placeholder: "Instagram",
    name: "instagram",
  },
  {
    placeholder: "Facebook",
    name: "facebook",
  },
  {
    placeholder: "Telegram",
    name: "telegram",
  },
];

export const ADD_STAFF_FIELDS: AddStaffFields[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Имя",
  },
  {
    name: "login",
    type: "text",
    placeholder: "Логин",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Пароль",
  },
  {
    name: "confirm",
    type: "password",
    placeholder: "Проверка пароля",
  },
];
