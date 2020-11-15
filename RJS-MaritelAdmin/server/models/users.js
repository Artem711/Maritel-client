const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
  name: String,
  login: {type: String, required: true, unique: true},
  password: String,
  rights: String,
  products: Boolean,
  orders: Boolean,
  users: Boolean,
  settings: Boolean,
})

module.exports = mongoose.model('Users', usersSchema);