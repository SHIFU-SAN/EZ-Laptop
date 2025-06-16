const express = require('express');
const router = express.Router();

const AccountController = require("../controllers/AccountController");
const TokenController = require("../controllers/TokenController");
const UploadController = require("../controllers/UploadController");

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
    .put('/info',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ['set: own info'];
            return next();
        },
        AccountController.checkPermission,
        AccountController.setInfo
    )
    .put('/avatar',
        TokenController.checkToken,
        (req, res, next) => {
            req.permissions = ['set: own avatar'];
            return next();
        },
        AccountController.checkPermission,
        UploadController.uploadAvatar.single('Avatar'),
        AccountController.setAvatar,
    )

module.exports = router;