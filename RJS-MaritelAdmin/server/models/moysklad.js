const mongoose = require('mongoose');
const { Schema } = mongoose;

const skladSchema = new Schema({
  login: String,
  password: String,
})

module.exports = mongoose.model('moySklad', skladSchema);