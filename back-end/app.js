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
const cart_routes = require('./routes/CartRoutes');
const comment_routes = require('./routes/CommentRoutes');
const cpu_routes = require('./routes/CPU_routes');

app
    .use(cors())
    .use(express.json())
    .use('/api/account', account_routes)
    .use('/api/adapter', adapter_routes)
    .use('/api/bill', bill_routes)
    .use('/api/cart', cart_routes)
    .use('/api/comment', comment_routes)
    .use('/api/cpu', cpu_routes);

app.listen(PORT, HOST, () => console.log(`${DateServices.getTimeCurrent()} Server is running on port ${PORT}...`));