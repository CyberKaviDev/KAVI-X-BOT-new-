const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    chatId: { type: String, required: true },
    reason: { type: String, required: true },
    upvotes: { type: [String], default: [] },
    downvotes: { type: [String], default: [] },
});

const votemodel = mongoose.model('votemodel', voteSchema);

module.exports = votemodel;
