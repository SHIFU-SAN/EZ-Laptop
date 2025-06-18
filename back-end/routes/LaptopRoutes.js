const express = require('express');
const router = express.Router();

const AccountController = require('../controllers/AccountController');
const LaptopController = require('../controllers/LaptopController');
const TokenController = require('../controllers/TokenController');
const UploadController = require('../controllers/UploadController');

router
    .post('/',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["add: laptop"];
            return next();
        },
        AccountController.checkPermission,
        LaptopController.addLaptop)
    .get('/list', LaptopController.getAllLaptops)
    .get('/:id', LaptopController.getLaptopByID)
    .put('/info',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["set: laptop"];
            return next();
        },
        AccountController.checkPermission,
        LaptopController.setLaptop)
    .put('/avatar',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["set: laptop"];
            return next();
        },
        AccountController.checkPermission,
        UploadController.uploadLaptop.single('LaptopImage'),
        LaptopController.setImage)
    .delete('/',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ["remove: laptop"];
            return next();
        },
        AccountController.checkPermission,
        LaptopController.removeLaptop)

module.exports = router;