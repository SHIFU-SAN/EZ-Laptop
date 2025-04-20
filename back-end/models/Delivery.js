const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
    CustomerID: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    ShippingAddress: {
        type: String,
        required: true
    },
    Bill_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Bill'
    }
});

const Delivery = mongoose.model('Delivery', DeliverySchema);

module.exports = Delivery;