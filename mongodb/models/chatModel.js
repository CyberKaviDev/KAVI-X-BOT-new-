// models/chatModel.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chatId: { type: String, required: true, unique: true },
  isBanned: { type: Boolean, default: false },
  // Add other fields as needed
});

const chatModel = mongoose.model('chatModel', chatSchema);
module.exports = chatModel;