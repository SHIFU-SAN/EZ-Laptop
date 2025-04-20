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
const comments_notification_routes = require('./routes/CommentsNotificationRoutes');
const cpu_routes = require('./routes/CPU_routes');
const discount_routes = require('./routes/DiscountRoutes');
const gpu_routes = require('./routes/GPU_routes');
const hard_drive_routes = require('./routes/HardDriveRoutes');
const laptop_routes = require('./routes/LaptopRoutes');
const delivery_routes = require('./routes/DeliveryRoutes');
const present_routes = require('./routes/PresentRoutes');
const ram_routes = require('./routes/RAM_routes');
const screen_routes = require('./routes/ScreenRoutes');

app
    .use(cors())
    .use(express.json())
    .use('/api/account', account_routes)
    .use('/api/adapter', adapter_routes)
    .use('/api/bill', bill_routes)
    .use('/api/cart', cart_routes)
    .use('/api/comment', comment_routes)
    .use('/api/comments/notification', comments_notification_routes)
    .use('/api/cpu', cpu_routes)
    .use('/api/discount', discount_routes)
    .use('/api/gpu', gpu_routes)
    .use('/api/hard_drive', hard_drive_routes)
    .use('/api/laptop', laptop_routes)
    .use('/api/delivery', delivery_routes)
    .use('/api/present', present_routes)
    .use('/api/ram', ram_routes)
    .use('/api/screen', screen_routes);

app.listen(PORT, HOST, () => console.log(`${DateServices.getTimeCurrent()} Server is running on port ${PORT}...`));