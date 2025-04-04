const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    CustomerID: {
        type: String,
        required: true,
        unique: true
    },
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Name: String,
    Avatar: String,
    Permission: String
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;