const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    Laptops: [{
        LaptopID: {
            type: Schema.Types.ObjectId,
            ref: 'Laptop'
        },
        RAM_ID: {
            type: Schema.Types.ObjectId,
            ref: 'RAM'
        },
        HardDriveID: {
            type: Schema.Types.ObjectId,
            ref: 'HardDrive'
        },
        AdapterID: {
            type: Schema.Types.ObjectId,
            ref: 'Adapter'
        }
    }],
    Status: {
        type: Boolean,
        default: true
    }
});

const Discount = mongoose.model('Discount', DiscountSchema);

module.exports = Discount;