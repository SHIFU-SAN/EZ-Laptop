const jwt = require('jsonwebtoken');
require('dotenv').config();

const DateServices = require("../services/DateServices");

class TokenController {
    static async checkToken(req, res, next) {
        try {
            jwt.verify(req.cookies?.token, process.env.SECRET_KEY, (err, payload) => {
                if (err) {
                    console.log(err.name);
                    return res.status(403).send({message: err.name});
                } else {
                    req.user_id = payload.id;
                    return next();
                }
            });
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't check token! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't check token!",
                error: err.message
            });
        }
    }

    static async clearToken(req, res) {
        console.log("Clearing token");
        return res.status(200).cookie('token', null, {httpOnly: true}).json({message:'Token cleared!'});
    }
}

module.exports = TokenController;