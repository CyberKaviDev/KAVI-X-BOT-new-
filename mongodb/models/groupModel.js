const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupId: { type: String, required: true }, // Group ID (m.chat)
    openAt: { type: Date, required: true }, // Group will open at this exact date/time
    status: { type: String, default: 'pending' }, // pending, completed
    createdAt: { type: Date, default: Date.now } // Time when entry was created
});

const groupModel = mongoose.model('groupModel', groupSchema);
module.exports = groupModel;