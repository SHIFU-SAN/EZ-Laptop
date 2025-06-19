const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    Laptop: {
        type: Schema.Types.ObjectId,
        ref: 'Laptop',
        required: true
    },
    Receiver: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Total: {
        type: Number,
        required: true
    },
    Confirm: {
        type: Boolean,
        default: false
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;