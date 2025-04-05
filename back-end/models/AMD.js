const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AMD_Schema = new Schema({
    CPU_ID: {
        type: String,
        required: true,
        unique: true
    },
    BaseClock: {
        type: Double,
        required: true
    },
    BoostClock: {
        type: Double,
        require: true
    }
});

const AMD = mongoose.model('AMD', AMD_Schema);

module.exports = AMD;