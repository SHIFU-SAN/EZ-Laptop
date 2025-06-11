const express = require('express');
const router = express.Router();

const AccountController = require("../controllers/AccountController");

router
    .post('/', AccountController.addAccount)

module.exports = router;