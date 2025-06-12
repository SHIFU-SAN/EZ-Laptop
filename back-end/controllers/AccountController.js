const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AccountServices = require("../services/AccountServices");
const DateServices = require("../services/DateServices");

class AccountController {
    static async addAccount(req, res) {
        try {
            const AccountFound = await AccountServices.findAccountByEmail(req.body?.Email);
            if (!AccountFound) {
                const NewAccount = await AccountServices.createAccount(req.body);
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
}

module.exports = AccountController;