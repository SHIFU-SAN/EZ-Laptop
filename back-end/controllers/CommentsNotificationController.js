const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const NewCommentsNotificationServices = require("../services/CommentsNotificationServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected new comments notification controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class CommentsNotificationController {
    static async addNotification(req, res) {
        try {
            const NewNotification = await NewCommentsNotificationServices.createNotification(req.body);
            return res.status(201).json(NewNotification);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add new comments notification! Error: ${err}`);
        }
    }

    static async getNotifications(req, res) {
        try {
            const NotificationsList = await NewCommentsNotificationServices.readNotifications();
            return res.status(200).json(NotificationsList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get new comments notifications list! Error: ${err}`);
        }
    }

    static async getNotificationByID(req, res) {
        try {
            const NotificationTarget = await NewCommentsNotificationServices.readNotificationByID(req.params.id);
            return res.status(200).json(NotificationTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get new comments notification by ID! Error: ${err}`);
        }
    }

    static async setNotification(req, res) {
        try {
            const NotificationTarget = await NewCommentsNotificationServices.updateNotification(req.params.id, req.body);
            return res.status(200).json(NotificationTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set new comments notification! Error: ${err}`);
        }
    }

    static async addProduct(req, res) {
        try {
            const NewProduct = await NewCommentsNotificationServices.createProduct(req.params.id, req.body);
            return res.status(201).json(NewProduct);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add product to new comments notification! Error: ${err}`);
        }
    }

    static async addMoreProducts(req, res) {
        try {
            const NotificationID = req.params.id;
            const NewProducts = req.body.map(async product => await NewCommentsNotificationServices.createProduct(NotificationID, product));
            return res.status(201).json(NewProducts);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add more product to new comments notification! Error: ${err}`);
        }
    }

    static async removeProduct(req, res) {
        try {
            const ProductRemoved = await NewCommentsNotificationServices.deleteProduct(req.params.id, req.params.product_id);
            return res.status(200).json(ProductRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove product from new comments notification! Error: ${err}`);
        }
    }

    static async removeProducts(req, res) {
        try {
            const ProductsRemoved = await NewCommentsNotificationServices.deleteProducts(req.params.id);
            return res.status(200).json(ProductsRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove products from new comments notification! Error: ${err}`);
        }
    }

    static async removeNotification(req, res) {
        try {
            const NotificationRemoved = await NewCommentsNotificationServices.deleteNotification(req.params.id);
            return res.status(200).json(NotificationRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove new comments notification! Error: ${err}`);
        }
    }
}

module.exports = CommentsNotificationController;