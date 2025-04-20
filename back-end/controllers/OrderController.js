const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const OrderServices = require("../services/OrderServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected order controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class OrderController {
    static async addOrder(req, res) {
        try {
            const NewOrder = await OrderServices.createOrder(req.body);
            return res.status(201).json(NewOrder);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add order! Error: ${err}`);
        }
    }

    static async getOrdersList(req, res) {
        try {
            const OrdersList = await OrderServices.readOrders();
            return res.status(200).json(OrdersList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get orders list! Error: ${err}`);
        }
    }

    static async getOrderByID(req, res) {
        try {
            const OrderTarget = await OrderServices.readOrderByID(req.params.id);
            return res.status(200).json(OrderTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get order by ID! Error: ${err}`);
        }
    }

    static async setOrder(req, res) {
        try {
            const OrderTarget = await OrderServices.updateOrder(req.params.id, req.body);
            return res.status(200).json(OrderTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set order! Error: ${err}`);
        }
    }

    static async removeOrder(req, res) {
        try {
            const OrderRemoved = await OrderServices.deleteOrder(req.params.id);
            return res.status(200).json(OrderRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't delete order! Error: ${err}`);
        }
    }
}

module.exports = OrderController;