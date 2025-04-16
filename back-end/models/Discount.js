const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscountSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
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
    Laptops: [{
        LaptopID: {
            type: Schema.Types.ObjectId,
            ref: 'Laptop'
        }
    }]
});

const Discount = mongoose.model('Discount', DiscountSchema);

module.exports = Discount;