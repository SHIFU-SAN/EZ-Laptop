const express = require('express');
const router = express.Router();

const AccountController = require("../controllers/AccountController");
const RoleController = require("../controllers/RoleController");
const TokenController = require("../controllers/TokenController");

router.get('/',
    TokenController.checkToken,
    (req, res, next) => {
        req.permissions = ["get: all roles"];
        return next();
    },
    AccountController.checkPermission,
    RoleController.getAllRoles);

module.exports = router;