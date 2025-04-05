const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaptopSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    Branch: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    CPU_ID: {
        type: String,
        required: true,
        ref: 'CPU'
    },
    GPU_ID: {
        type: String,
        required: true,
        ref: 'GPU'
    },
    ScreenID: {
        type: String,
        required: true,
        ref: 'Screen'
    },
    BatteryID: {
        type: String,
        required: true,
        ref: 'Battery'
    },
    AdapterID: {
        type: String,
        required: true,
        ref: 'Adapter'
    },
    TDP: Int32,
    Weight: {
        type: Double,
        required: true
    },
    Price: Double,
    Quantity: Int32
});

const Laptop = mongoose.model('Laptop', LaptopSchema);

module.exports = Laptop;