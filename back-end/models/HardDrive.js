const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductImageSchema = require("./ReusableSchema");

const HardDriveSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
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
    InstallationInfos: [{
        SlotNumber: Int32,
        LaptopID: {
            type: Schema.Types.ObjectId,
            ref: 'Laptop'
        }
    }],
    Price: Double,
    Images: [ProductImageSchema],
    Status: {
        type: Boolean,
        default: true
    }
});

const HardDrive = mongoose.model('HardDrive', HardDriveSchema);

module.exports = HardDrive;