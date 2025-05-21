const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const HOST = process.env.HOST;
const PORT = process.env.AUTH_PORT;

const auth_routes = require('./routes/AuthRoutes');

app
    .use(cors())
    .use(express.json())
    .use('/api/account', auth_routes)
    .listen(PORT, HOST, () => {
        console.log(`Auth server is running on port ${PORT}...`);
    });

