const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} = graphql;


const Product = require('../models/product');
const User = require('../models/users');
const Categories = require('../models/categories');
const Colors = require('../models/colors');
const Basic = require('../models/mainSettings');
const MoySklad = require('../models/moysklad');
const Promo = require('../models/promo');
const SpecCateg = require('../models/SpecCategories');

const SpecCategType = new GraphQLObjectType({
  name: "SpecCateg",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: { type: new GraphQLList(GraphQLString) },
  })
})

const PromoType = new GraphQLObjectType({
  name: "Promo",
  fields: () => ({
    id: { type: GraphQLID },
    promoName: { type: GraphQLString },
    promoDisc: { type: GraphQLString },
    promoValue: { type: GraphQLString },
  })
})

const MoySkaldType = new GraphQLObjectType({
  name: "MoySklad",
  fields: () => ({
    id: { type: GraphQLID },
    login: { type: GraphQLString },
    password: { type: GraphQLString },
  })
})

const BasicType = new GraphQLObjectType({
  name: "BasicSettings",
  fields: () => ({
    id: { type: GraphQLID },
    phone: { type: GraphQLString },
    mail: { type: GraphQLString },
    instagram: { type: GraphQLString },
    facebook: { type: GraphQLString },
    telegram: { type: GraphQLString },
  })
})

const CategoriesType = new GraphQLObjectType({
  name: "Categories",
  fields: () => ({
    id: { type: GraphQLID },
    category: { type: GraphQLString },
    subCategories: { type: GraphQLString }
  })
})

const ColorsType = new GraphQLObjectType({
  name: "Colors",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    link: { type: GraphQLString },
  })
})

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    uuid: { type: GraphQLString },
    title: { type: GraphQLString },
    descr: { type: GraphQLString },
    color: { type: GraphQLString },
    price: { type: GraphQLString },
    gender: { type: GraphQLString },
    modelParam: { type: GraphQLString },
    care: { type: GraphQLString },
    composition: { type: GraphQLString },
    sizes: { type: GraphQLString },
    lastPrice: { type: GraphQLString },
    type: { type: GraphQLString },
    photos: { type: new GraphQLList(GraphQLString) },
    previewPhoto: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    login: { type: GraphQLString },
    rights: { type: GraphQLString },
    products: { type: GraphQLBoolean },
    users: { type: GraphQLBoolean },
    orders: { type: GraphQLBoolean },
    settings: { type: GraphQLBoolean },
  })
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        descr: { type: new GraphQLNonNull(GraphQLString) },
        color: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: new GraphQLNonNull(GraphQLString) },
        modelParam: { type: new GraphQLNonNull(GraphQLString) },
        composition: { type: new GraphQLNonNull(GraphQLString) },
        sizes: { type: new GraphQLNonNull(GraphQLString) },
        lastPrice: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        photos: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
        previewPhoto: { type: new GraphQLNonNull(GraphQLString) },
        care: { type: new GraphQLNonNull(GraphQLString) },
        timestamp: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, {
        uuid,
        title,
        gender,
        descr,
        color,
        price,
        modelParam,
        composition,
        sizes,
        lastPrice,
        type,
        photos,
        care,
        previewPhoto,
        timestamp
      }) {
        const product = new Product({
          uuid,
          title,
          descr,
          gender,
          color,
          price,
          modelParam,
          composition,
          sizes,
          lastPrice,
          type,
          care,
          photos,
          previewPhoto,
          timestamp,
        });

        return product.save();
      },
    },
    deleteProduct: {
      type: ProductType,
      args: { uuid: { type: GraphQLString } },
      resolve(parent, { uuid }) {
        return Product.findOneAndRemove({ uuid });
      }
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        descr: { type: new GraphQLNonNull(GraphQLString) },
        color: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: new GraphQLNonNull(GraphQLString) },
        modelParam: { type: new GraphQLNonNull(GraphQLString) },
        composition: { type: new GraphQLNonNull(GraphQLString) },
        sizes: { type: new GraphQLNonNull(GraphQLString) },
        lastPrice: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        photos: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
        previewPhoto: { type: new GraphQLNonNull(GraphQLString) },
        care: { type: new GraphQLNonNull(GraphQLString) },
        timestamp: { type: new GraphQLNonNull(GraphQLString) },

      },
      resolve(parent, {
        id,
        uuid,
        title,
        descr,
        gender,
        color,
        price,
        modelParam,
        composition,
        sizes,
        lastPrice,
        type,
        photos,
        care,
        previewPhoto,
        timestamp,
      }) {
        return Product.findOneAndUpdate(
          { uuid, },
          {
            title,
            descr,
            color,
            gender,
            price,
            modelParam,
            composition,
            sizes,
            lastPrice,
            type,
            photos,
            care,
            previewPhoto,
            timestamp,
          }, { new: true }
        );
      },
    },
    addCategories: {
      type: CategoriesType,
      args: {
        category: { type: new GraphQLNonNull(GraphQLString) },
        subCategories: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, { category, subCategories }) {
        const categ = new Categories({
          category,
          subCategories
        });

        return categ.save()
      }
    },
    updateCategories: {
      type: CategoriesType,
      args: {
        id: { type: GraphQLID },
        category: { type: new GraphQLNonNull(GraphQLString) },
        subCategories: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, { id, category, subCategories }) {
        return Categories.findByIdAndUpdate(id, {
          $set: {
            category,
            subCategories
          }
        }, { new: true })
      },
    },
    deleteCategories: {
      type: CategoriesType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Categories.findByIdAndRemove(id);
      },
    },
    addColor: {
      type: ColorsType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        link: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { name, link }) {
        const color = new Colors({
          name,
          link
        });

        color.save()
      }
    },
    updateColor: {
      type: ColorsType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        link: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { id, name, link }) {
        return Colors.findByIdAndUpdate(id, {
          $set: {
            name,
            link,
          }
        }, { new: true })
      }
    },
    deleteColor: {
      type: ColorsType,
      args: { id: { type: GraphQLID }, },
      resolve(parent, { id }) {
        return Colors.findByIdAndRemove(id)
      }
    },
    addBasic: {
      type: BasicType,
      args: {
        phone: { type: new GraphQLNonNull(GraphQLString) },
        mail: { type: new GraphQLNonNull(GraphQLString) },
        instagram: { type: new GraphQLNonNull(GraphQLString) },
        facebook: { type: new GraphQLNonNull(GraphQLString) },
        telegram: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { phone, mail, instagram, facebook, telegram }) {
        const basic = new Basic({
          phone,
          mail,
          instagram,
          facebook,
          telegram
        });

        basic.save()
      }
    },
    updateBasic: {
      type: BasicType,
      args: {
        id: { type: GraphQLID },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        mail: { type: new GraphQLNonNull(GraphQLString) },
        instagram: { type: new GraphQLNonNull(GraphQLString) },
        facebook: { type: new GraphQLNonNull(GraphQLString) },
        telegram: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { id, phone, mail, instagram, facebook, telegram }) {
        return Basic.findByIdAndUpdate(id, {
          $set: {
            phone,
            mail,
            instagram,
            facebook,
            telegram
          }
        }, { new: true })
      }
    },
    addMoySklad: {
      type: MoySkaldType,
      args: {
        login: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, { login, password }) {
        const newSkald = new MoySklad({
          login, password
        });

        newSkald.save();
      }
    },
    updateMoySklad: {
      type: MoySkaldType,
      args: {
        id: { type: GraphQLID },
        login: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, { id, login, password }) {
        return MoySklad.findByIdAndUpdate(id, {
          $set: {
            login,
            password
          }
        }, { new: true })
      }
    },
    addPromo: {
      type: PromoType,
      args: {
        promoName: { type: new GraphQLNonNull(GraphQLString) },
        promoValue: { type: new GraphQLNonNull(GraphQLString) },
        promoDisc: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { promoName, promoValue, promoDisc }) {
        const newPromo = new Promo({
          promoName,
          promoValue,
          promoDisc
        });

        newPromo.save()
      }
    },
    updatePromo: {
      type: PromoType,
      args: {
        id: { type: GraphQLID },
        promoName: { type: new GraphQLNonNull(GraphQLString) },
        promoValue: { type: new GraphQLNonNull(GraphQLString) },
        promoDisc: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { id, promoName, promoValue, promoDisc }) {
        return Promo.findByIdAndUpdate(id, {
          $set: {
            promoName,
            promoValue,
            promoDisc,
          }
        }, { new: true })
      }
    },
    deletePromo: {
      type: PromoType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, { id }) {
        return Promo.findByIdAndRemove(id)
      }
    },
    addSpecCateg: {
      type: SpecCategType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        products: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
      },
      resolve(parent, { name, products }) {
        const newSpecCateg = new SpecCateg({
          name,
          products
        });

        newSpecCateg.save();
      }
    },
    updateSpecCateg: {
      type: SpecCategType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        products: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
      },
      resolve(parent, { id, name, products }) {
        return SpecCateg.findByIdAndUpdate(id,
          {
            $set: {
              name,
              products
            }
          }, { new: true })
      }
    },
    deleteSpecCateg: {
      type: SpecCategType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, { id }) {
        return SpecCateg.findByIdAndRemove(id)
      }
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        login: { type: new GraphQLNonNull(GraphQLString) },
        rights: { type: new GraphQLNonNull(GraphQLString) },
        products: { type: new GraphQLNonNull(GraphQLBoolean) },
        users: { type: new GraphQLNonNull(GraphQLBoolean) },
        orders: { type: new GraphQLNonNull(GraphQLBoolean) },
        settings: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(parent, { name, password, login, rights, products, users, orders, settings }) {
        const newUser = new User({
          name,
          password,
          login,
          rights,
          products,
          users,
          orders,
          settings,
        })

        newUser.save();
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        login: { type: new GraphQLNonNull(GraphQLString) },
        rights: { type: new GraphQLNonNull(GraphQLString) },
        products: { type: new GraphQLNonNull(GraphQLBoolean) },
        users: { type: new GraphQLNonNull(GraphQLBoolean) },
        orders: { type: new GraphQLNonNull(GraphQLBoolean) },
        settings: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(parent, { id, name, login, rights, products, users, orders, settings }) {
        return User.findByIdAndUpdate(id, {
          $set: {
            name,
            login,
            rights,
            products,
            users,
            orders,
            settings,
          }

        }, { new: true })
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return User.findByIdAndRemove(id)
      }
    }
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    product: {
      type: ProductType,
      args: { uuid: { type: GraphQLString } },
      resolve(parent, args) {
        return Product.findOne({ uuid: args.uuid, });
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find({});
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({})
      }
    },
    categories: {
      type: new GraphQLList(CategoriesType),
      resolve() {
        return Categories.find({})
      }
    },
    colors: {
      type: new GraphQLList(ColorsType),
      resolve() {
        return Colors.find({})
      }
    },
    basics: {
      type: new GraphQLList(BasicType),
      resolve() {
        return Basic.find({})
      }
    },
    getSklad: {
      type: MoySkaldType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return MoySklad.findById(id)
      }
    },
    getAllPromo: {
      type: new GraphQLList(PromoType),
      resolve() {
        return Promo.find({})
      }
    },
    getSpecCateg: {
      type: new GraphQLList(SpecCategType),
      resolve() {
        return SpecCateg.find({})
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});