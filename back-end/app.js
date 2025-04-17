const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

const account_routes = require('./routes/AccountRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/account', account_routes);

app.listen(PORT, HOST, () => console.log(`Server is running on port ${PORT}...`));