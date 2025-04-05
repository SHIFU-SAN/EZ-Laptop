const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartDetailSchema = new Schema({
    CartID: {
        type: String,
        required: true,
        ref: 'Cart',
        index: 1
    },
    LaptopID: {
        type: String,
        required: true,
        ref: 'Laptop',
        index: 1
    },
    Quantity: int32
});

const CartDetails = mongoose.model('CartDetails', CartDetailSchema);

module.exports = CartDetails;