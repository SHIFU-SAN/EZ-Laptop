const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const WarrantyServices = require("../services/WarrantyServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected warranty controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class WarrantyController {
    static async addWarranty(req, res) {
        try {
            const NewWarranty = await WarrantyServices.createWarranty(req.body);
            return res.status(201).json(NewWarranty);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add warranty! Error: ${err}`);
        }
    }

    static async getWarranties(req, res) {
        try {
            const WarrantiesList = await WarrantyServices.readWarranties();
            return res.status(200).json(WarrantiesList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get warranties list! Error: ${err}`);
        }
    }

    static async getWarrantyByID(req, res) {
        try {
            const WarrantyTarget = await WarrantyServices.readWarrantyByID(req.params.id);
            return res.status(200).json(WarrantyTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get warranty by ID! Error: ${err}`);
        }
    }

    static async setWarranty(req, res) {
        try {
            const WarrantyTarget = await WarrantyServices.updateWarranty(req.params.id, req.body);
            return res.status(200).json(WarrantyTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set warranty! Error: ${err}`);
        }
    }

    static async addProduct(req, res) {
        try {
            const NewProduct = await WarrantyServices.createProduct(req.body);
            return res.status(201).json(NewProduct);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add product! Error: ${err}`);
        }
    }

    static async addMoreProducts(req, res) {
        try {
            const NewProducts = req.body.map(async product => await WarrantyServices.createProduct(product));
            return res.status(201).json(NewProducts);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add more product! Error: ${err}`);
        }
    }

    static async removeProduct(req, res) {
        try {
            const ProductRemoved = await WarrantyServices.deleteProduct(req.params.id, req.params.product_id);
            return res.status(200).json(ProductRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove product! Error: ${err}`);
        }
    }

    static async removeProducts(req, res) {
        try {
            const ProductsRemoved = await WarrantyServices.deleteProducts(req.params.id);
            return res.status(200).json(ProductsRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove products! Error: ${err}`);
        }
    }

    static async removeWarranty(req, res) {
        try {
            const WarrantyTarget = await WarrantyServices.deleteWarranty(req.params.id);
            return res.status(200).json(WarrantyTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove warranty! Error: ${err}`);
        }
    }
}

module.exports = WarrantyController;