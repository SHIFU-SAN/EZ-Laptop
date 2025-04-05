const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RAM_detailsSchema = new Schema({
    SlotNumber: {
        type: Int32,
        required: true
    },
    HardDriveID: {
        type: String,
        required: true,
        ref: 'HardDrive',
        index: 1
    },
    LaptopID: {
        type: String,
        required: true,
        ref: 'Laptop',
        index: 1
    }
});

const RAM_details = mongoose.model('RAM_details', RAM_detailsSchema);

module.exports = RAM_details;