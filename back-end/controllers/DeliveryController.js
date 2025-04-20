const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const DeliveryServices = require("../services/DeliveryServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected delivery controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class DeliveryController {
    static async addDelivery(req, res) {
        try {
            const NewDelivery = await DeliveryServices.createDelivery(req.body);
            return res.status(201).json(NewDelivery);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add delivery! Error: ${err}`);
        }
    }

    static async getDeliveries(req, res) {
        try {
            const DeliveriesList = await DeliveryServices.readDeliveries();
            return res.status(200).json(DeliveriesList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get deliveries list! Error: ${err}`);
        }
    }

    static async getDeliveryByID(req, res) {
        try {
            const DeliveryTarget = await DeliveryServices.readDeliveryByID(req.params.id);
            return res.status(200).json(DeliveryTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get delivery by ID! Error: ${err}`);
        }
    }

    static async setDelivery(req, res) {
        try {
            const DeliveryTarget = await DeliveryServices.updateDelivery(req.params.id, req.body);
            return res.status(200).json(DeliveryTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set delivery! Error: ${err}`);
        }
    }

    static async removeDelivery(req, res) {
        try {
            const DeliveryRemoved = await DeliveryServices.deleteDelivery(req.params.id);
            return res.status(200).json(DeliveryRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't delete delivery! Error: ${err}`);
        }
    }
}

module.exports = DeliveryController;