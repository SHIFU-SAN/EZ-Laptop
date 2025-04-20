const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {
    ProductImageSchema,
    InstallationInfoSchema
} = require("./ReusableSchema");

const HardDriveSchema = new Schema({
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
    ReadSpeed: Number,
    WriteSpeed: Number,
    TBW: Number,
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

const HardDrive = mongoose.model('HardDrive', HardDriveSchema);

module.exports = HardDrive;