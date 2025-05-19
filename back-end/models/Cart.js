const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsOrderSchema = require("./ReusableSchema");

const CartSchema = new Schema({
    CustomerID: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    ProductsOrder: {
        type: [ProductsOrderSchema],
        default: []
    },
    Total: {
        type: Number,
        default: 0
    }
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;