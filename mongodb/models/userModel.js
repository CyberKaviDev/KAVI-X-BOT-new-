const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  jid: { type: String, required: true, unique: true }, // Added unique constraint
  name: { type: String, required: true },
  serialNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isBanned: { type: Boolean, default: false }, // Added isBanned field with default value
  createdAt: { type: Date, default: Date.now }
});

// Define the model with the name 'userModel'
const userModel = mongoose.model('userModel', UserSchema);
module.exports = userModel;
