const mongoose = require('mongoose');

const warningSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0
  }
});

const warningModel = mongoose.model('warningModel', warningSchema);
module.exports = warningModel;
