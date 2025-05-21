const express = require('express');
const router = express.Router();

const AccountController = require('../controllers/AccountController');

router
    .post('/check-password', AccountController.checkPassword)
    .put('/reset-password', AccountController.resetPassword);

module.exports = router;
