const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AMD_schema = new Schema({
    BaseClock: Number,
    BoostClock: Number
});

const Intel_schema = new Schema({
    NumberPcores: Number,
    BaseClockPcores: Number,
    BoostClockPcores: Number,
    NumberEcores: Number,
    BaseClockEcores: Number,
    BoostEcoreEcores: Number
});

const CPU_schema = new Schema({
    Branch: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    NumberCores: {
        type: Number,
        required: true
    },
    NumberThreads: {
        type: Number,
        required: true
    },
    L2_cache: {
        type: Number,
        required: true
    },
    L3_cache: {
        type: Number,
        required: true
    },
    ProcessorTechnology: {
        type: Number,
        required: true
    },
    DefaultTDP: {
        type: Number,
        required: true
    },
    MaxTDP: {
        type: Number,
        required: true
    },
    AMD: AMD_schema,
    Intel: Intel_schema
});

const CPU = mongoose.model('CPU', CPU_schema);

module.exports = CPU;