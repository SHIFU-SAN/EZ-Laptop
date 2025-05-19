const express = require('express');
const app = express();
const router = express.Router();

const EmailVerificationController = require('../controllers/EmailVerificationController');

app.use(express.json());

router
    .post('/add', EmailVerificationController.addEmailVerification)
    .put('/check', EmailVerificationController.checkCode);

module.exports = router;