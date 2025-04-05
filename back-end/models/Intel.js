const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IntelSchema = new Schema({
    CPU_ID: {
        type: String,
        required: true,
        unique: true
    },
    NumberPcores: {
        type: Int32,
        required: true
    },
    BaseClockPcores: {
        type: Double,
        required: true
    },
    BoostClockPcores: {
        type: Double,
        required: true
    },
    NumberEcores: {
        type: Int32,
        required: true
    },
    BaseClockEcores: {
        type: Double,
        required: true
    },
    BoostClockEcores: {
        type: Double,
        required: true
    }
});

const Intel = mongoose.model('Intel', IntelSchema);

module.exports = Intel;