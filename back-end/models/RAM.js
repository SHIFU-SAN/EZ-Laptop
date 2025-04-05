const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RAM_Schema = new Schema({
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
    BUS: {
        type: Int32,
        required: true
    },
    Price: Double
});

const RAM = mongoose.model('RAM', RAM_Schema);

module.exports = RAM;