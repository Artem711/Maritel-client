const fetch = require('node-fetch');
const btoa = require('btoa')
const Products = require('./models/product')

const getOrders = async (offset, limit, login, password) => {
  const res = await fetch(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `basic ${b64EncodeUnicode(
          `${login}:${password}`
        )}`,
        header: "X-RateLimit-Remaining",
      },
    }
  );

  const json = await res.json();

  if (json.rows.length === 0 && json.meta.limit + json.meta.offset > json.meta.size) {
    return []
  }

  return json.rows.map(obj => ({
    articul: obj.code,
    stock: obj.stock,
    price: obj.salePrice.toString().split('').slice(0, -2).join(''),
  }));
};

function b64EncodeUnicode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(
      _,
      p1
    ) {
      return String.fromCharCode(+`0x${p1}`);
    })
  );
}

const getOrdersSettings = async (token, offset, limit, step, login, password) => {
  await getOrders(offset, limit, login, password).then(orders => {
    if (orders.length) {
      for (let i = 0; i < token.length; i++) {
        const sizes = JSON.parse(token[i].sizes).map(size => {
          const stock = orders.find(order => order && +order.articul === +size.articul);

          return {
            size: size.size,
            articul: size.articul,
            stock: stock ? `${stock.stock}` : "0",
          }
        });
        const id = token[i]._id;

        const price = Math.max(...JSON.parse(token[i].sizes).map(size => {
          const findPrice = orders.find(order => order && +order.articul === +size.articul)
          if (findPrice) {
            return +findPrice.price
          }
        }).filter(price => price));

        if (!(JSON.stringify(sizes) === token[i].sizes)) {
          console.log('Обновление остатков..');
          Products.findByIdAndUpdate(
            id,
            { sizes: JSON.stringify(sizes) },
            { new: true },
            (err, user) => {

              if (err) return console.log(err);
              console.log("Остатки синхронизированы");
            })
        }

        if (isFinite(price) && price && price > token[i].lastPrice && token[i].lastPrice !== '') {
          Products.findByIdAndUpdate(id,
            { lastPrice: "" },
            { new: true },
            (err, user) => {
              if (err) return console.log(err);
              console.log("Старая цена меньше новой и была удалена");
            }
          )
        }

        if (token[i].lastPrice && +token[i].price > +token[i].lastPrice && !isFinite(price)) {
          Products.findByIdAndUpdate(id,
            { lastPrice: "" },
            { new: true },
            (err, user) => {
              if (err) return console.log(err);
              console.log("Старая цена меньше новой и была удалена");
            }
          )
        }

        if (isFinite(price) && price && price !== token[i].price) {
          Products.findByIdAndUpdate(
            id,
            { price },
            { new: true },
            (err, user) => {

              if (err) return console.log(err);
              console.log("Цены сихронизированы");
            })
        }
      }
      const nextStep = offset + step;
      return getOrdersSettings(token, nextStep, limit, step, login, password)
    } else {
      console.log("Продукты были обновлены")
      return;
    }
  }).catch(e => console.log(e))
}

module.exports = { getOrdersSettings }