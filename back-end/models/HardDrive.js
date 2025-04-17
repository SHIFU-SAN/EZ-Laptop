const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {
    ProductImageSchema,
    InstallationInfoSchema
} = require("./ReusableSchema");

const HardDriveSchema = new Schema({
    Branch: String,
    Name: String,
    Type: {
        type: String,
        required: true
    },
    Capacity: {
        type: Int32,
        required: true
    },
    ReadSpeed: {
        type: Int32,
        required: true
    },
    WriteSpeed: {
        type: Int32,
        required: true
    },
    TBW: Int32,
    LaptopInstallations: {
        type: [InstallationInfoSchema],
        default: []
    },
    Price: Double,
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