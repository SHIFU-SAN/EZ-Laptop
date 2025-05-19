const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const HOST = process.env.HOST;
const PORT = process.env.AUTH_PORT;

const account_routes = require("./routes/AccountRoutes");

app
    .use(cors())
    .use(express.json())
    .use('/api/account', account_routes)
    .listen(PORT, HOST, () => {
        console.log(`Auth server is running on port ${PORT}...`);
    });

