const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AccountServices = require("../services/AccountServices");
const CartServices = require("../services/CartServices");
const DateServices = require("../services/DateServices");

class AccountController {
    static async addAccount(req, res) {
        try {
            const AccountFound = await AccountServices.findAccountByEmail(req.body?.Email);
            if (!AccountFound) {
                const NewAccount = await AccountServices.createAccount(req.body);
                await CartServices.createCart(NewAccount._id);
                return res.status(201).json(NewAccount);
            } else {
                return res.status(422).send({
                    message: `Account already exists`,
                    isExist: true
                });
            }
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't add new account! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't add new account!",
                error: err.message
            });
        }
    }

    static async checkPassword(req, res) {
        try {
            const AccountFound = await AccountServices.findAccountByEmail(req.body?.Email);
            if (!AccountFound) {
                return res.status(401).send({
                    message: "Account not found!",
                    isExist: false
                });
            } else {
                await bcrypt.compare(req.body?.Password, AccountFound?.Password, (err, result) => {
                    if (!result) {
                        return res.status(401).send({
                            message: "Incorrect password!",
                            isExist: true,
                            result
                        });
                    } else {
                        const Token = jwt.sign({id: AccountFound?._id}, process.env.SECRET_KEY, {expiresIn: "1d"});
                        return res.status(200).cookie('token', Token, {httpOnly: true}).json({
                            isExist: true,
                            result
                        });
                    }
                });
            }
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't check account!`);
            return res.status(400).send({
                message: "Can't check account!",
                error: err.message
            })
        }
    }

    static async getAccountById(req, res) {
        try {
            const AccountFound = await AccountServices.findAccountByID(req.user_id);
            return res.status(200).json(AccountFound);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't get account by ID! ${err.message}`);
            return res.status(400).send({
                message: "Can't get account by ID!",
                error: err.message
            });
        }
    }

    static async checkPermission(req, res, next) {
        const AccountFound = await AccountServices.findAccountByID(req.user_id);
        const AccountPermissions = AccountFound.Role?.Permissions;
        const CheckResult = req.permissions.every(permission => AccountPermissions.includes(permission));
        if (!CheckResult) {
            return res.status(403).send({
                message: "You don't have permission!"
            });
        } else {
            next();
        }
    }

    static async setInfo(req, res) {
        try {
            const AccountSet = await AccountServices.updateAccount(req.body?.UserID, req.body);
            return res.status(200).json(AccountSet);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't set info! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't set info!",
                error: err.message
            });
        }
    }

    static async setOwnInfo(req, res) {
        try {
            const AccountSet = await AccountServices.updateAccount(req.user_id, req.body);
            return res.status(200).json(AccountSet);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't set account info! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't set account info!",
                error: err.message
            });
        }
    }

    static async setOwnAvatar(req, res) {
        try {
            const AccountSet = await AccountServices.updateAccount(req.user_id, {Avatar: req?.file?.path});
            return res.status(200).json(AccountSet);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't set avatar! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't set avatar!",
                error: err.message
            })
        }
    }
}

module.exports = AccountController;