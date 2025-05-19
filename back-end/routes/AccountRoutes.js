const express = require('express');
const app = express();
const router = express.Router();

const AccountController = require('../controllers/AccountController');

app.use(express.json());

router
    .get('/list', AccountController.getAccountsList)
    .get('/:id', AccountController.getAccountByID)
    .get('/info/check', AccountController.checkAccountExistByEmail)
    .put('/:id', AccountController.setAccount)
    .delete('/:id', AccountController.removeAccount);

module.exports = router;