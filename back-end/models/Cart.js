const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    UserID: {
        type: String,
        required: true,
        ref: 'Account'
    }
})