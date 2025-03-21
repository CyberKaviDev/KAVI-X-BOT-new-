const mongoose = require('mongoose');

const stickerSchema = new mongoose.Schema({
    stickers: {
      type: Map,
      of: new mongoose.Schema({
        text: { type: String, required: true },
        mentionedJid: { type: [String], default: [] },
        creator: { type: String, required: true },
        at: { type: Number, required: true },
        locked: { type: Boolean, default: false }
      })
    }
  });

const stickerModel = mongoose.model('stickerModel', stickerSchema);
module.exports = stickerModel;