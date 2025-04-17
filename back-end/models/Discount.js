const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsFK_schema = require("./ReusableSchema");

const DiscountSchema = new Schema({
    LaptopID: {
        type: Schema.Types.ObjectId,
        required: true
    },
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
    Products: {
        type: [ProductsFK_schema],
        default: []
    },
    Status: {
        type: Boolean,
        default: true
    }
});

const Discount = mongoose.model('Discount', DiscountSchema);

module.exports = Discount;