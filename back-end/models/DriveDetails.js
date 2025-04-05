const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriveDetailsSchema = new Schema({
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

const DriveDetails = mongoose.model('DriveDetails', DriveDetailsSchema);

module.exports = DriveDetails;