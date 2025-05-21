const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    PhoneNumber: String,
    Name: String,
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Avatar: {
        type: String,
        default: "E:\\Workspace\\Project\\EZ-Laptop\\back-end\\Images\\Avatar\\EmptyAvatar.png"
    },
    Permission: {
        type: String,
        default: "Customer"
    },
    AllowUpdate: {
        type: Boolean,
        default: false
    }
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;