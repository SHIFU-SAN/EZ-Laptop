const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsFK_schema = require("./ReusableSchema");

const DiscountSchema = new Schema({
    Products: ProductsFK_schema,
    Start: {
        type: Date,
        required: true
    },
    End: {
        type: Date,
        required: true
    },
    Percentage: {
        type: Number,
        required: true
    },
    Event: String,
    Status: {
        type: Boolean,
        default: true
    }
});

const Discount = mongoose.model('Discount', DiscountSchema);

module.exports = Discount;