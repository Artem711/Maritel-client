require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const schema = require('./schema/schema.js');
const bodyParser = require('body-parser');
const Products = require('./models/product');
const MoySklad = require('./models/moysklad');
const app = express();
const PORT = process.env.PORT || 5000;
const { getOrdersSettings } = require('./updateProducts')

const {
  uploadToServer,
  deletePhotosS3
} = require('./photosHandlers');

setInterval(() => {
  Products.find({}).select().exec()
    .then(async (token) => {
      const limit = 1000;
      const step = 1000;
      const offset = 0;

      MoySklad.findById(process.env.REACT_APP_MY_SKLAD_ID).select().exec()
        .then(async (mySklad) => {
          getOrdersSettings(token, offset, limit, step, mySklad.login, mySklad.password);
        });
    });
}, 420000)
//
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Headers', 'origin, contenttype, accept');
  next()
})

app.use(express.json({ extended: true }))

app.use('/auth', require('./routes/login.router'));

mongoose.connect(`mongodb+srv://admin:EoRHh9rzLTEJHmXA@maritelgeneral.llqa9.gcp.mongodb.net/maritel?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)

app.use(express.static('build'));
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.post('/upload', upload.any('uploaded_file'), uploadToServer)

app.post('/deletePhotoS3', bodyParser.text(), (req, res) => deletePhotosS3(req, res))

const dbContection = mongoose.connection;
dbContection.on('error', err => console.log(`Contection error: ${err}`));
dbContection.once('open', () => console.log('Connected to DB'))

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
