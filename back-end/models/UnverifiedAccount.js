const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnverifiedAccountSchema = new Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    PhoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Name: String,
    Avatar: {
        type: String,
        default: "E:\\Workspace\\Project\\EZ-Laptop\\back-end\\Images\\Avatar\\EmptyAvatar.png"
    },
    Permission: {
        type: String,
        default: "Customer"
    }
});

const UnverifiedAccount = mongoose.model('UnverifiedAccount', UnverifiedAccountSchema);

module.exports = UnverifiedAccount;