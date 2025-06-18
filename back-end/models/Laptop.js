const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaptopSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    CPU: {
        type: String,
        required: true
    },
    GPU: {
        type: String,
        required: true
    },
    RAM: {
        type: String,
        required: true
    },
    SSD: {
        type: Number,
        required: true
    },
    Screen: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        default: ''
    },
    Price: {
        type: Number,
        required: true
    }
});

const Laptop = mongoose.model('Laptop', LaptopSchema);

module.exports = Laptop;