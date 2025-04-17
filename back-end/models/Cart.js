const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsOrderSchema = require("./ReusableSchema");

const CartSchema = new Schema({
    CustomerID: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    Products: {
        type: [ProductsOrderSchema],
        default: []
    },
    Total: Double
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;