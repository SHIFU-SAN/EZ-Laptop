const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductImageSchema = require("./ReusableSchema");

const LaptopFK_schema = require("./ReusableSchema");

const AdapterSchema = new Schema({
    Branch: String,
    Name: {
        type: String,
        required: true
    },
    OutputPower: {
        type: Number,
        required: true
    },
    OutputVoltage: Number,
    OutputCurrent: Number,
    Price: Number,
    Images: {
        type: [ProductImageSchema],
        default: []
    },
    CompatibleLaptops: {
        type: [LaptopFK_schema],
        default: []
    },
    Status: {
        type: Boolean,
        default: true
    }
});

const Adapter = mongoose.model('Adapter', AdapterSchema);
module.exports = Adapter;