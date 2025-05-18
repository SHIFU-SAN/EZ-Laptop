const express = require('express');
const app = express();
const router = express.Router();

const EmailVerificationController = require('../controllers/EmailVerificationController');

app.use(express.json());

router
    .post('/add', EmailVerificationController.addEmailVerification)
    .get('/check/info', EmailVerificationController.checkCode)
    .delete('/delete', EmailVerificationController.removeCode)

module.exports = router;