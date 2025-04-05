const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HardDriveSchema = new Schema({
    ID: {
        type: String,
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
    Price: Double
});

const HardDrive = mongoose.model('HardDrive', HardDriveSchema);

module.exports = HardDrive;