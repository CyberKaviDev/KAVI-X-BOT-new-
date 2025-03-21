require('../settings.js')
const mongoose = require("mongoose");
const dbURI = mongoDB;
const chalk = require('chalk')

const connectDB = async () => {
    if (!dbURI || dbURI.trim() === '') {
        console.error('\nMongoDB URI is empty. Exiting the program.');
        process.exit(1);
    }

    try {
        await mongoose.connect(dbURI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000
        });
    } catch (err) {
        console.error('MongoDB connection error.');
        process.exit(1);
    }
};

module.exports = connectDB;