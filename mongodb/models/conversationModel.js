const mongoose = require('mongoose');

// Define the conversation schema
const conversationSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  conversations: [
    {
      role: { type: String, enum: ['user', 'assistant'], required: true },
      content: { type: String, required: true }
    }
  ]
});

// Create and export the model
const conversationModel = mongoose.model('conversationModel', conversationSchema);
module.exports = conversationModel;
