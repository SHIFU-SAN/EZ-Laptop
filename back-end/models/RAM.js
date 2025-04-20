const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {
    ProductImageSchema,
    InstallationInfoSchema
} = require("./ReusableSchema");

const RAM_Schema = new Schema({
    Branch: String,
    Name: String,
    PortType: {
        type: String,
        required: true
    },
    Capacity: {
        type: Number,
        required: true
    },
    BUS: {
        type: Number,
        required: true
    },
    LaptopInstallations: {
        type: [InstallationInfoSchema],
        default: []
    },
    Price: Number,
    Images: {
        type: [ProductImageSchema],
        default: []
    },
    Status: {
        type: Boolean,
        default: true
    }
});

const RAM = mongoose.model('RAM', RAM_Schema);

module.exports = RAM;