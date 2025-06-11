const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = require("./Role");

const User = Role.findOne({Name: 'User'});

const AccountSchema = new Schema({
    Email: {
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
    Avatar: {
        type: String,
        default: "/public/images/avatars/EmptyAvatar.png"
    },
    Role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        default: User?._id
    }
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;