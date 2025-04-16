const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductImageSchema = require("./ReusableSchema");

const LaptopSchema = new Schema({
    Branch: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    CPU_ID: {
        type: Schema.Types.ObjectId,
        ref: 'CPU',
        required: true
    },
    GPU_ID: {
        type: Schema.Types.ObjectId,
        ref: 'GPU',
        required: true
    },
    ScreenID: {
        type: Schema.Types.ObjectId,
        ref: 'Screen',
        required: true
    },
    Battery: {
        type: String,
        required: true
    },
    AdapterID: {
        type: Schema.Types.ObjectId,
        ref: 'Adapter',
        required: true
    },
    TDP: Int32,
    Weight: {
        type: Double,
        required: true
    },
    Warranty: {
        type: Int32,
        required: true
    },
    Price: Double,
    Quantity: Int32,
    Images: [ProductImageSchema],
    Status: {
        type: Boolean,
        default: true
    }
});

const Laptop = mongoose.model('Laptop', LaptopSchema);

module.exports = Laptop;