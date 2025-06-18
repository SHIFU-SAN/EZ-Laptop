const express = require('express');
const router = express.Router();

const AccountController = require("../controllers/AccountController");
const OrderController = require("../controllers/OrderController");
const TokenController = require("../controllers/TokenController");

router
    .post('/',
        TokenController.checkToken,
        (req, res, next)=>{
        req.permissions=["add: own order"];
        return next();
        },
        AccountController.checkPermission,
        OrderController.addOrder)

module.exports = router;