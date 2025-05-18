const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const EmailVerificationServices = require("../services/EmailVerificationServices");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`${DateServices.getTimeCurrent()} Connected email verificatiion controller to database successfully! ^-^`);
    } catch (err) {
        console.error(`${DateServices.getTimeCurrent()} Email verificatiion controller connection to database failed! Error: ${err}`);
    }
}

connectToDB();

app.use(express.json());

class EmailVerificationController {
    static async addEmailVerification(req, res) {
        try {
            const NewEmailVerification = await EmailVerificationServices.createEmailVerification(req.body.Email);
            return res.status(201).json(NewEmailVerification);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add email verification! Error: ${err}`)
        }
    }

    static async checkCode(req, res) {
        try {
            const ConfirmResult = await EmailVerificationServices.compareCode(req.query.email, req.query.code);
            return res.status(200).json(ConfirmResult);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't check code! Error: ${err}`)
        }
    }

    static async removeCode(req, res) {
        try {
            const CodeRemoved = await EmailVerificationServices.deleteCode(req.body.Email);
            return res.status(200).json(CodeRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove code! Error: ${err}`)
        }
    }
}

module.exports = EmailVerificationController;