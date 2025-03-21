const mongoose = require("mongoose");
const connectDataBase = require('../main.js');

async function DeveloperData() {
  const developerDB = await connectDataBase();
  const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    purchased: { type: Boolean, default: false },
    purchaseExpiry: { type: Date, default: null },
  });

  const UserModelSecondary = developerDB.model("User", UserSchema);
  return UserModelSecondary;
}

module.exports = { DeveloperData };
