const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const Port = process.env.PORT;
const Host = process.env.HOST;

const DateServices = require("./services/DateServices");
const account_routes = require("./routes/AccountRoutes");
const laptop_routes = require("./routes/LaptopRoutes");
const order_routes = require("./routes/OrderRoutes");
const role_routes = require("./routes/RoleRoutes");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`${DateServices.getTimeCurrent()} Database connected successfully. ^-^`);
    } catch (err) {
        console.log(`${DateServices.getTimeCurrent()} Database connection failed! Error: ${err.message}`);
    }
}

connectToDB();

app
    .use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))
    .use(cookieParser())
    .use(express.json())
    .use('/public/images', express.static('public/images'))
    .use('/account', account_routes)
    .use('/laptop', laptop_routes)
    .use('/order', order_routes)
    .use('/role', role_routes)
    .use('/*splat', (req, res) => res.status(404).send({message: "API not found!"}))
    .listen(Port, Host, () => console.log(`${DateServices.getTimeCurrent()} Server is running at: http://${Host}:${Port}`));