const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const AccountServices = require("../services/AccountServices");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connection successful! ^-^");
    } catch (err) {
        console.error(`Database connection failed! Error: ${err}`);
    }
}

connectToDB();

app.use(express.json());

class AccountController {
    static async createAccount(req, res) {
        try {
            const NewAccount = await AccountServices.createAccount(req.body);
            return res.json(NewAccount);
        } catch (err) {
            console.error(`Can't create account! Error: ${err}`)
        }
    }

    static async getAccountsList(req, res) {
        try {
            const AccountsList = await AccountServices.getAccounts()
            return res.json(AccountsList);
        } catch (err) {
            console.error(`Can't get accounts list! Error: ${err}`)
        }
    }

    static async getAccountByID(req, res) {
        try {
            const Target = await AccountServices.getAccountByID(req.params.id);
            return res.json(Target);
        } catch (err) {
            console.error(`Can't get account by ID! Error: ${err}`)
        }
    }

    static async updateAccount(req, res) {
        try {
            const Target = await AccountServices.updateAccount(req.params.id, req.body);
            return res.json(Target);
        } catch (err) {
            console.error(`Can't update account! Error: ${err}`)
        }
    }

    static async deleteAccount(req, res) {
        try {
            const Target = await AccountServices.deleteAccount(req.params.id);
            return res.json(Target);
        } catch (err) {
            console.error(`Can't delete account! Error: ${err}`)
        }
    }
}

module.exports = AccountController;