const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductImageSchema = require("./ReusableSchema");

const AdapterSchema = new Schema({
    Branch: String,
    Name: {
        type: String,
        required: true
    },
    OutputPower: {
        type: Int32,
        required: true
    },
    OutputVoltage: {
        type: Double,
        required: true
    },
    OutputCurrent: {
        type: Double,
        required: true
    },
    Price: Double,
    Images: [ProductImageSchema],
    CompatibleLaptops: [{
        LaptopID: {
            type: Schema.Types.ObjectId,
            ref: 'Laptop',
            required: true
        }
    }],
    Status: {
        type: Boolean,
        default: true
    }
});

const Adapter = mongoose.model('Adapter', AdapterSchema);
module.exports = Adapter;