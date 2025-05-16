const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailVerificationSchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    Code: {
        type: String,
        required: true
    }
});

const EmailVerification = mongoose.model('EmailVerification', EmailVerificationSchema);

module.exports = EmailVerification;