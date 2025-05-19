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
            //Check if unverified account exist
            const AccountFound = await UnverifiedAccountServices.checkIfUnverifiedAccountExist(req.body.Email, req.body.Password);
            // If unverified account don't exist then create one
            if (!AccountFound) {
                const NewUnverifiedAccount = await UnverifiedAccountServices.createUnverifiedAccount(req.body);
                res.status(201).json(NewUnverifiedAccount);

                // Delete unverified account after 30 minutes
                setTimeout(async () => {
                    await UnverifiedAccountServices.deleteUnverifiedAccount(NewUnverifiedAccount._id);
                    console.log("Deleted unverified account after 30 minutes successfully! ^-^")
                }, 1800000);
            } else {
                res.status(201).json(AccountFound);
            }
        } catch (error) {
            res.status(400);
            console.log(`${DateServices.getTimeCurrent()} Can't add unverified account! Error: ${error}`);
        }
    }
}

module.exports = UnverifiedAccountController;