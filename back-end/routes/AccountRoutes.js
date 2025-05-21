const express = require('express');
const router = express.Router();

const AccountController = require('../controllers/AccountController');

router
    .get('/list', AccountController.getAccountsList)
    .get('/:id', AccountController.getAccountByID)
    .get('/info/check', AccountController.checkAccountExistByEmail)
    .put('/', AccountController.setAccount)
    .delete('/:id', AccountController.removeAccount);

module.exports = router;