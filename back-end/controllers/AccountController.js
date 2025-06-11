const AccountServices = require("../services/AccountServices");
const DateServices = require("../services/DateServices");

class AccountController {
    static async addAccount(req, res) {
        try {
            const NewAccount = await AccountServices.createAccount(req.body);
            return res.status(201).json(NewAccount);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't add new account! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't add new account!",
                error: err.message
            });
        }
    }
}

module.exports = AccountController;