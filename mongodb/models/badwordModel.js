const mongoose = require('mongoose');

const badWordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true
  }
});

const badwordModel = mongoose.model('badwordModel', badWordSchema);
module.exports = badwordModel;