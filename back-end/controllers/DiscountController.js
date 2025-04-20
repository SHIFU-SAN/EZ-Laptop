const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const DiscountServices = require("../services/DiscountServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected discount controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class DiscountController {
    static async addDiscount(req, res) {
        try {
            const NewDiscount = await DiscountServices.createDiscount(req.body);
            return res.status(201).json(NewDiscount);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add discount! Error: ${err}`);
        }
    }

    static async getDiscounts(req, res) {
        try {
            const DiscountsList = await DiscountServices.readDiscounts();
            return res.status(200).json(DiscountsList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get discounts list! Error: ${err}`);
        }
    }

    static async getDiscountById(req, res) {
        try {
            const DiscountTarget = await DiscountServices.readDiscountById(req.params.id);
            return res.status(200).json(DiscountTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get discount by ID! Error: ${err}`);
        }
    }

    static async setDiscount(req, res) {
        try {
            const DiscountTarget = await DiscountServices.updateDiscount(req.params.id, req.body);
            return res.status(200).json(DiscountTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set discount! Error: ${err}`);
        }
    }

    static async addProduct(req, res) {
        try {
            const NewProduct = await DiscountServices.createProduct(req.params.id, req.body);
            return res.status(201).json(NewProduct);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add product to discount! Error: ${err}`);
        }
    }

    static async addMoresProducts(req, res) {
        try {
            const DiscountID = req.params.id;
            const NewProducts = req.body.map(async product => await DiscountServices.createProduct(DiscountID, product));
            return res.status(201).json(NewProducts);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add more product to discount! Error: ${err}`);
        }
    }

    static async removeProduct(req, res) {
        try {
            const ProductRemoved = await DiscountServices.deleteProduct(req.params.id, req.params.product_id);
            return res.status(200).json(ProductRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove product from discount! Error: ${err}`);
        }
    }

    static async removeProducts(req, res) {
        try {
            const ProductsRemoved = await DiscountServices.deleteProducts(req.params.id);
            return res.status(200).json(ProductsRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove products from discount! Error: ${err}`);
        }
    }

    static async removeDiscount(req, res) {
        try {
            const DiscountTarget = await DiscountServices.deleteDiscount(req.params.id);
            return res.status(200).json(DiscountTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove discount! Error: ${err}`);
        }
    }
}

module.exports = DiscountController;