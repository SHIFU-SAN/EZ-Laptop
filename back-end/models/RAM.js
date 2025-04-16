const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductImageSchema = require("./ReusableSchema");

const RAM_Schema = new Schema({
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
    BUS: {
        type: Int32,
        required: true
    },
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

const RAM = mongoose.model('RAM', RAM_Schema);

module.exports = RAM;