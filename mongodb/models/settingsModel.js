const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    settings: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    }
});

const settingsModel = mongoose.model('settingsModel', settingSchema);
module.exports = settingsModel;