const express = require('express');
const router = express.Router();

const AccountController = require('../controllers/AccountController');
const LaptopController = require('../controllers/LaptopController');
const TokenController = require('../controllers/TokenController');

router
    .post('/',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["add: laptop"];
            return next();
        },
        AccountController.checkPermission,
        LaptopController.addLaptop)
    .get('/list',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["get: all laptops"];
            return next();
        },
        AccountController.checkPermission,
        LaptopController.getAllLaptops)
    .put('/',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["set: laptop"];
            return next();
        },
        AccountController.checkPermission,
        LaptopController.setLaptop)
    .delete('/',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["remove: laptop"];
            return next();
        },
        AccountController.checkPermission,
        LaptopController.removeLaptop)

module.exports = router;