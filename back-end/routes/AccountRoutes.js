const express = require('express');
const router = express.Router();

const AccountController = require("../controllers/AccountController");
const TokenController = require("../controllers/TokenController");

router
    .post('/', AccountController.addAccount)
    .post('/login', AccountController.checkPassword)
    .get('/personal',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ['get: own data'];
            return next();
        },
        AccountController.checkPermission,
        AccountController.getAccountById)
    .get('/logout', TokenController.clearToken)

module.exports = router;