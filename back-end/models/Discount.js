const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsFK_schema = require("./ReusableSchema");

const DiscountSchema = new Schema({
    ProductsFK: ProductsFK_schema,
    Start: {
        type: Date,
        required: true
    },
    End: {
        type: Date,
        required: true
    },
    Percentage: {
        type: Double,
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