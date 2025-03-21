const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk')

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Public ping endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Server is running', status: 'OK' });
});

// Use the PORT from the environment, or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(chalk.bold.greenBright(`\nServer is running on port ${PORT}\n`))
});