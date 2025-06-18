const express = require('express');
const router = express.Router();

const AccountController = require("../controllers/AccountController");
const OrderController = require("../controllers/OrderController");
const TokenController = require("../controllers/TokenController");

router
    .post('/',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["add: own order"];
            return next();
        },
        AccountController.checkPermission,
        OrderController.addOrder)
    .get('/list',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["get: all orders"];
            return next();
        },
        AccountController.checkPermission,
        OrderController.getAllOrders)
    .get('/personal',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["get: own orders"];
            return next();
        },
        AccountController.checkPermission,
        OrderController.getOrdersByUser)
    .put('/',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["set: all orders"];
            return next();
        },
        AccountController.checkPermission,
        OrderController.setOrder)
    .delete('/',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["remove: all orders"];
            return next();
        },
        AccountController.checkPermission,
        OrderController.removeOrder);

module.exports = router;