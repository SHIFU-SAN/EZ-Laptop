const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscountSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    LaptopID: {
        type: String,
        required: true,
        ref: 'Laptop'
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
    EventID: {
        type: String,
        required: true,
        ref: 'Event'
    }
});

const Discount = mongoose.model('Discount', DiscountSchema);

module.exports = Discount;