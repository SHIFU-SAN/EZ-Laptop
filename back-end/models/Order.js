const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsOrderSchema = require("./ReusableSchema");

const OrderSchema = new Schema({
    CustomerID: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    ShippingAddress: {
        type: String,
        required: true
    },
    Products: {
        type: [ProductsOrderSchema],
        default: []
    }
})