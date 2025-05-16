const express = require('express');
const app = express();
const router = express.Router();

const UnverifiedAccountController = require('../controllers/UnverifiedAccountController');

app.use(express.json());

router
    .post('/add', UnverifiedAccountController.addUnverifiedAccount)
    .put('/save', UnverifiedAccountController.saveUnverifiedAccount)
    .delete('/delete/account', UnverifiedAccountController.removeUnverifiedAccount);

module.exports = router;