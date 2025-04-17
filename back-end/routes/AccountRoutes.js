const express = require('express');
const app = express();
const router = express.Router();

const AccountController = require('../controllers/AccountController');

app.use(express.json());

router
    .post('/add', AccountController.addAccount)
    .get('/list', AccountController.getAccountsList)
    .get('/:id', AccountController.getAccountByID)
    .put('/:id', AccountController.setAccount)
    .delete('/:id', AccountController.deleteAccount);

module.exports = router;