const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsOrderSchema = require("./ReusableSchema");

const BillSchema = new Schema({
    UserID: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    ProductsOrder: {
        type: [ProductsOrderSchema],
        default: []
    },
    Total: Double
});

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;