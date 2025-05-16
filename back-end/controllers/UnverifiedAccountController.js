const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const UnverifiedAccountServices = require("../services/UnverifiedAccountServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected unverified account controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class UnverifiedAccountController {
    static async addUnverifiedAccount(req, res) {
        try {
            const unverifiedAccount = await UnverifiedAccountServices.createUnverifiedAccount(req.body);
            res.status(200).json(unverifiedAccount);
        } catch (error) {
            res.status(400);
            console.log(`${DateServices.getTimeCurrent()} Can't add unverified account! Error: ${error}`);
        }
    }

    static async saveUnverifiedAccount(req, res) {
        try {
            const unverifiedAccount = await UnverifiedAccountServices.saveUnverifiedAccount(req.body.email);
            res.status(200).json(unverifiedAccount);
        } catch (error) {
            res.status(400);
            console.log(`${DateServices.getTimeCurrent()} Can't save unverified account! Error: ${error}`);
        }
    }

    static async removeUnverifiedAccount(req, res) {
        try {
            const unverifiedAccount = await UnverifiedAccountServices.deleteUnverifiedAccount(req.params.id);
            res.status(200).json(unverifiedAccount);
        } catch (error) {
            res.status(400);
            console.log(`${DateServices.getTimeCurrent()} Can't remove unverified account! Error: ${error}`);
        }
    }
}

module.exports = UnverifiedAccountController;