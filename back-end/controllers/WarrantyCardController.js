const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const WarrantyCardServices = require("../services/WarrantyCardServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected warranty card controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class WarrantyCardController {
    static async addWarrantyCard(req, res) {
        try {
            const NewWarrantyCard = await WarrantyCardServices.createWarrantyCard(req.body);
            return res.status(201).json(NewWarrantyCard);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add warranty card! Error: ${err}`);
        }
    }

    static async getWarrantyCards(req, res) {
        try {
            const WarrantyCardsList = await WarrantyCardServices.readWarrantyCards();
            return res.status(200).json(WarrantyCardsList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get warranty cards list! Error: ${err}`);
        }
    }

    static async getWarrantyCardByID(req, res) {
        try {
            const WarrantyCardTarget = await WarrantyCardServices.readWarrantyCardByID(req.params.id);
            return res.status(200).json(WarrantyCardTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get warranty card by ID! Error: ${err}`);
        }
    }

    static async setWarrantyCard(req, res) {
        try {
            const WarrantyCardTarget = await WarrantyCardServices.updateWarrantyCard(req.params.id, req.body);
            return res.status(200).json(WarrantyCardTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set warranty card! Error: ${err}`);
        }
    }

    static async addProduct(req, res) {
        try {
            const NewProduct = await WarrantyCardServices.createProduct(req.params.id, req.body);
            return res.status(201).json(NewProduct);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add product to warranty card! Error: ${err}`);
        }
    }

    static async addMoreProducts(req, res) {
        try {
            const NewProducts = req.body.map(async product => await WarrantyCardServices.createProduct(req.params.id, product));
            return res.status(201).json(NewProducts);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add more product to warranty card! Error: ${err}`);
        }
    }

    static async removeProduct(req, res) {
        try {
            const ProductRemoved = await WarrantyCardServices.deleteProduct(req.params.id, req.params.product_id);
            return res.status(200).json(ProductRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove product from warranty card! Error: ${err}`);
        }
    }

    static async removeProducts(req, res) {
        try {
            const ProductsRemoved = await WarrantyCardServices.deleteProducts(req.params.id);
            return res.status(200).json(ProductsRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove products from warranty card! Error: ${err}`);
        }
    }

    static async addError(req, res) {
        try {
            const NewError = await WarrantyCardServices.createError(req.params.id, req.body);
            return res.status(201).json(NewError);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add error to warranty card! Error: ${err}`);
        }
    }

    static async addMoreErrors(req, res) {
        try {
            const NewErrors = req.body.map(async error => await WarrantyCardServices.createError(req.params.id, error));
            return res.status(201).json(NewErrors);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add more error to warranty card! Error: ${err}`);
        }
    }

    static async removeError(req, res) {
        try {
            const ErrorRemoved = await WarrantyCardServices.deleteError(req.params.id, req.params.error_id);
            return res.status(200).json(ErrorRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove error from warranty card! Error: ${err}`);
        }
    }

    static async removeErrors(req, res) {
        try {
            const ErrorsRemoved = await WarrantyCardServices.deleteErrors(req.params.id);
            return res.status(200).json(ErrorsRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove errors from warranty card! Error: ${err}`);
        }
    }

    static async removeWarrantyCard(req, res) {
        try {
            const WarrantyCardRemoved = await WarrantyCardServices.deleteWarrantyCard(req.params.id);
            return res.status(200).json(WarrantyCardRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove warranty card! Error: ${err}`);
        }
    }
}

module.exports = WarrantyCardController;