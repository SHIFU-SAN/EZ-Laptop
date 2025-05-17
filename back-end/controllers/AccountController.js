const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const AccountServices = require("../services/AccountServices");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`${DateServices.getTimeCurrent()} Connected account controller to database successfully! ^-^`);
    } catch (err) {
        console.error(`${DateServices.getTimeCurrent()} Account controller connection to database failed! Error: ${err}`);
    }
}

connectToDB();

app.use(express.json());

class AccountController {
    static async addAccount(req, res) {
        try {
            const NewAccount = await AccountServices.createAccount(req.body);
            return res.status(201).json(NewAccount);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add account! Error: ${err}`)
        }
    }

    static async getAccountsList(req, res) {
        try {
            const AccountsList = await AccountServices.readAccounts()
            return res.status(200).json(AccountsList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get accounts list! Error: ${err}`)
        }
    }

    static async getAccountByID(req, res) {
        try {
            const AccountTarget = await AccountServices.readAccountByID(req.params.id);
            return res.status(200).json(AccountTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get account by ID! Error: ${err}`)
        }
    }

    static async setAccount(req, res) {
        try {
            const AccountTarget = await AccountServices.updateAccount(req.params.id, req.body);
            return res.status(200).json(AccountTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set account! Error: ${err}`)
        }
    }

    static async removeAccount(req, res) {
        try {
            const AccountTarget = await AccountServices.deleteAccount(req.params.id);
            return res.status(200).json(AccountTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't delete account! Error: ${err}`)
        }
    }

    static async checkAccountExistByEmail(req, res) {
        try {
            const AccountTarget = await AccountServices.findAccountByEmail(req.query.email);
            return res.status(200).json(AccountTarget ? true : false);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't check account exist by email! Error: ${err}`)
        }
    }
}

module.exports = AccountController;