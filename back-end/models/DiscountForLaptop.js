const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscountForLaptopSchema = new Schema({
    LaptopID: {
        type: String,
        required: true,
        ref: 'Laptop',
        index: 1
    },
    DiscountID: {
        type: String,
        required: true,
        ref: 'Discount',
        index: 1
    }
});

const Discount = mongoose.model('Discount', DiscountForLaptopSchema);

module.exports = Discount;