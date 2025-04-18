const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const BillServices = require("../services/BillServices");
const DateServics = require("../services/DateServices");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`${DateServics.getTimeCurrent()} Connected bill controller to database successfully! ^-^`);
    } catch (err) {
        console.error(`${DateServics.getTimeCurrent()} Bill controller connection to database failed! Error: ${err}`);
    }
}

connectToDB();

app.use(express.json());

class BillController {
    static async addBill(req, res) {
        try {
            const NewBill = await BillServices.createBill(req.body);
            return res.json(NewBill);
        } catch (err) {
            console.error(`${DateServics.getTimeCurrent()} Can't add bill! Error: ${err}`)
        }
    }

    static async getBillsList(req, res) {
        try {
            const BillsList = await BillServices.getBills();
            return res.json(BillsList);
        } catch (err) {
            console.error(`${DateServics.getTimeCurrent()} Can't get bills list! Error: ${err}`)
        }
    }

    static async getBillByID(req, res) {
        try {
            const BillTarget = await BillServices.getBillByID(req.params.id);
            return res.json(BillTarget);
        } catch (err) {
            console.error(`${DateServics.getTimeCurrent()} Can't get bill by ID! Error: ${err}`)
        }
    }

    static async setBill(req, res) {
        try {
            const BillTarget = await BillServices.updateBill(req.params.id, req.body);
            return res.json(BillTarget);
        } catch (err) {
            console.error(`${DateServics.getTimeCurrent()} Can't set bill! Error: ${err}`)
        }
    }

    static async addOrder(req, res) {
        try {
            const NewOrder = await BillServices.addOrder(req.params.id, req.body);
            return res.json(NewOrder);
        } catch (err) {
            console.error(`${DateServics.getTimeCurrent()} Can't add order! Error: ${err}`)
        }
    }

    static async addMoreOrder(req, res) {
        try {
            const BillID = req.params.id;
            const NewOrders = req.body.map(async order => await BillServices.addOrder(BillID, order));
            return res.json(NewOrders);
        } catch (err) {
            console.error(`${DateServics.getTimeCurrent()} Can't add more order! Error: ${err}`)
        }
    }

    static async removeOrder(req, res) {
        try {
            const OrderRemoved = await BillServices.removeOrder(req.params.id, req.params.product_id);
            return res.json(OrderRemoved);
        } catch (err) {
            console.error(`${DateServics.getTimeCurrent()} Can't remove order! Error: ${err}`)
        }
    }

    static async removeOrders(req, res) {
        try {
            const OrdersRemoved = await BillServices.removeOrders(req.params.id);
            return res.json(OrdersRemoved);
        } catch (err) {
            console.error(`${DateServics.getTimeCurrent()} Can't remove orders! Error: ${err}`)
        }
    }

    static async removeBill(req, res) {
        try {
            const BillTarget = await BillServices.deleteBill(req.params.id);
            return res.json(BillTarget);
        } catch (err) {
            console.error(`${DateServics.getTimeCurrent()} Can't remove bill! Error: ${err}`)
        }
    }
}

module.exports = BillController;