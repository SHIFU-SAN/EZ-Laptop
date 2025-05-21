const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const DateServices = require("../services/DateServices");
const AccountServices = require("../services/AccountServices");
const RefreshTokenServices = require("../services/RefreshTokenServices");

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

    static async checkPassword(req, res) {
        try {
            // Check password
            const AccountTarget = await AccountServices.readAccountByEmailAndPassword(req.body.Email, req.body.Password);
            // Create access token & refresh token
            const UserID = AccountTarget._id;
            const UserPermission = AccountTarget.Permission;
            const Payload = {
                _id: UserID,
                Permission: UserPermission
            }
            const AccessToken = jwt.sign(Payload, process.env.ACCESS_SECRET_KEY, {expiresIn: '1h'});
            const RefreshToken = jwt.sign(Payload, process.env.REFRESH_SECRET_KEY);
            // Save refresh token to db
            try {
                const NewRefreshToken = await RefreshTokenServices.createRefreshToken(RefreshToken);
                return res.status(202).json({
                    Verify: true,
                    ID: UserID,
                    Permission: UserPermission,
                    AccessToken: AccessToken,
                    RefreshToken: NewRefreshToken.Value
                });
            } catch (err) {
                console.error(`${DateServices.getTimeCurrent()} Can't create refresh token! Error: ${err}`);
                return res.status(400).send({
                    Message: "Can't create refresh token!",
                    Error: err
                });
            }
        } catch (err) {
            res.status(401).send({
                Message: "Wrong password!",
                Error: err
            });
            console.error(`${DateServices.getTimeCurrent()} Can't check password! Error: ${err}`)
        }
    }

    static async setAccount(req, res) {
        try {
            const AccountTarget = await AccountServices.updateAccount(req.body._id, req.body);
            return res.status(200).json(AccountTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set account! Error: ${err}`)
        }
    }

    static async resetPassword(req, res) {
        const Email = req.body.Email;
        try {
            const AccountFound = await AccountServices.findAccountByEmail(Email);
            if (!AccountFound.AllowUpdate) {
                return res.status(401).send({
                    Message: "Account isn't allow to update password!"
                });
            } else {
                await AccountServices.updateAccount(AccountFound._id, {
                    Password: req.body.NewPassword,
                    AllowUpdate: 'false'
                });
                return res.status(200).json({
                    Verify: true,
                    Message: "Reset password successfully!"
                })
            }
        } catch (err) {
            console.log(`Can't reset password for ${Email}! Error: ${err}`);
            res.status(400).send({
                Message: "Can't reset password!",
                Error: err
            })
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