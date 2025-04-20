const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const PresentServices = require("../services/PresentServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected present controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class PresentController {
    static async addPresent(req, res) {
        try {
            const NewPresent = await PresentServices.createPresent(req.body);
            return res.status(201).json(NewPresent);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add present! Error: ${err}`);
        }
    }

    static async getPresents(req, res) {
        try {
            const PresentsList = await PresentServices.readPresents();
            return res.status(200).json(PresentsList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get presents list! Error: ${err}`);
        }
    }

    static async getPresentByID(req, res) {
        try {
            const PresentTarget = await PresentServices.readPresentByID(req.params.id);
            return res.status(200).json(PresentTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get present by ID! Error: ${err}`);
        }
    }

    static async setPresent(req, res) {
        try {
            const PresentTarget = await PresentServices.updatePresent(req.params.id, req.body);
            return res.status(200).json(PresentTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set present! Error: ${err}`);
        }
    }

    static async addProduct(req, res) {
        try {
            const NewProduct = await PresentServices.createProduct(req.params.id, req.body);
            return res.status(201).json(NewProduct);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add product to present! Error: ${err}`);
        }
    }

    static async addMoreProducts(req, res) {
        try {
            const PresentID = req.params.id;
            const NewProducts = req.body.map(async product => await PresentServices.createProduct(PresentID, product));
            return res.status(201).json(NewProducts);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add more product to present! Error: ${err}`);
        }
    }

    static async removeProduct(req, res) {
        try {
            const ProductRemoved = await PresentServices.deleteProduct(req.params.id, req.params.product_id);
            return res.status(200).json(ProductRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove product from present! Error: ${err}`);
        }
    }

    static async removeProducts(req, res) {
        try {
            const ProductsRemoved = await PresentServices.deleteProducts(req.params.id);
            return res.status(200).json(ProductsRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove products from present! Error: ${err}`);
        }
    }

    static async removePresent(req, res) {
        try {
            const PresentRemoved = await PresentServices.deletePresent(req.params.id);
            return res.status(200).json(PresentRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove present! Error: ${err}`);
        }
    }
}

module.exports = PresentController;