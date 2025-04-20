const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const CommentServices = require("../services/CommentServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected comment controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class CommentController {
    static async addComment(req, res) {
        try {
            const NewComment = await CommentServices.createComment(req.body);
            return res.status(201).json(NewComment);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add comment! Error: ${err}`);
        }
    }

    static async getComments(req, res) {
        try {
            const CommentsList = await CommentServices.readComments();
            return res.status(200).json(CommentsList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get comments list! Error: ${err}`);
        }
    }

    static async getCommentByID(req, res) {
        try {
            const CommentTarget = await CommentServices.readCommentByID(req.params.id);
            return res.status(200).json(CommentTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get comment by ID! Error: ${err}`);
        }
    }

    static async setComment(req, res) {
        try {
            const CommentTarget = await CommentServices.updateComment(req.params.id, req.body);
            return res.status(200).json(CommentTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set comment! Error: ${err}`);
        }
    }

    static async addProduct(req, res) {
        try {
            const NewProduct = await CommentServices.createProduct(req.params.id, req.body);
            return res.status(201).json(NewProduct);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add product to comment! Error: ${err}`);
        }
    }

    static async addMoreProducts(req, res) {
        try {
            const CommentID = req.params.id;
            const NewProducts = req.body.map(async product => await CommentServices.createProduct(CommentID, product));

            return res.status(201).json(NewProducts);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add more product to comment! Error: ${err}`);
        }
    }

    static async removeProduct(req, res) {
        try {
            const ProductRemoved = await CommentServices.deleteProduct(req.params.id, req.params.product_id);
            return res.status(200).json(ProductRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove product from comment! Error: ${err}`);
        }
    }

    static async removeProducts(req, res) {
        try {
            const ProductsRemoved = await CommentServices.deleteProducts(req.params.id);
            return res.status(200).json(ProductsRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove products from comment! Error: ${err}`);
        }
    }

    static async removeComment(req, res) {
        try {
            const CommentTarget = await CommentServices.deleteComment(req.params.id);
            return res.status(200).json(CommentTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove comment! Error: ${err}`);
        }
    }
}

module.exports = CommentController;