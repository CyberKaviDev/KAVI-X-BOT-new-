const mongoose = require('mongoose');

// Define the schema for owner numbers
const ownerSchema = new mongoose.Schema({
    ownerNumbers: {
        type: [String],
        required: true,
    }
});

const authModel = mongoose.model('authModel', ownerSchema);

module.exports = authModel;
