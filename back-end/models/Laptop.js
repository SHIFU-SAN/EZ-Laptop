const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductImageSchema = require("./ReusableSchema");

const PortFK_schema = new Schema({
    PortID: {
        type: Schema.Types.ObjectId,
        ref: 'Port'
    }
});

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
    Ports: {
        type: [PortFK_schema],
        default: []
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
    TDP: Number,
    Weight: {
        type: Number,
        required: true
    },
    Warranty: {
        type: Number,
        required: true
    },
    Price: Number,
    Quantity: Number,
    Images: {
        type: [ProductImageSchema],
        default: []
    },
    Status: {
        type: Boolean,
        default: true
    }
});

const Laptop = mongoose.model('Laptop', LaptopSchema);

module.exports = Laptop;