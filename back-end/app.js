const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

const DateServices = require('./services/DateServices');
const account_routes = require('./routes/AccountRoutes');
const adapter_routes = require('./routes/AdapterRoutes');
const bill_routes = require('./routes/BillRoutes');

app
    .use(cors())
    .use(express.json())
    .use('/api/account', account_routes)
    .use('/api/adapter', adapter_routes)
    .use('/api/bill', bill_routes);

app.listen(PORT, HOST, () => console.log(`${DateServices.getTimeCurrent()} Server is running on port ${PORT}...`));