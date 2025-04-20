const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const CartServices = require("../services/CartServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected cart controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class CartController {
    static async addCart(req, res) {
        try {
            const NewCart = await CartServices.createCart(req.body);
            return res.status(201).json(NewCart);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add cart! Error: ${err}`);
        }
    }

    static async getCarts(req, res) {
        try {
            const CartsList = await CartServices.readCarts();
            return res.status(200).json(CartsList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get carts list! Error: ${err}`);
        }
    }

    static async getCartByID(req, res) {
        try {
            const CartTarget = await CartServices.readCartByID(req.params.id);
            return res.status(200).json(CartTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get cart by ID! Error: ${err}`);
        }
    }

    static async setCart(req, res) {
        try {
            const CartTarget = await CartServices.updateCart(req.params.id, req.body);
            return res.status(200).json(CartTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set cart! Error: ${err}`);
        }
    }

    static async addProduct(req, res) {
        try {
            const NewProduct = await CartServices.createProduct(req.params.id, req.body);
            return res.status(201).json(NewProduct);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add product to cart! Error: ${err}`);
        }
    }

    static async addMoreProducts(req, res) {
        try {
            const CartID = req.params.id;
            const NewProducts = req.body.map(async product => await CartServices.createProduct(CartID, product));
            return res.status(201).json(NewProducts);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add more product to cart! Error: ${err}`);
        }
    }

    static async removeProduct(req, res) {
        try {
            const ProductRemoved = await CartServices.deleteProduct(req.params.id, req.params.product_id);
            return res.status(200).json(ProductRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove product from cart! Error: ${err}`);
        }
    }

    static async removeProducts(req, res) {
        try {
            const ProductsRemoved = await CartServices.deleteProducts(req.params.id);
            return res.status(200).json(ProductsRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove products from cart! Error: ${err}`);
        }
    }

    static async removeCart(req, res) {
        try {
            const CartTarget = await CartServices.deleteCart(req.params.id);
            return res.status(200).json(CartTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove cart! Error: ${err}`);
        }
    }
}

module.exports = CartController;