const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AMD_schema = new Schema({
    BaseClock: Double,
    BoostClock: Double
});

const Intel_schema = new Schema({
    NumberPcores: Int32,
    BaseClockPcores: Double,
    BoostClockPcores: Double,
    NumberEcores: Int32,
    BaseClockEcores: Double,
    BoostEcoreEcores: Double
});

const CPU_schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    Branch: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    NumberCores: {
        type: Int32,
        required: true
    },
    NumberThreads: {
        type: Int32,
        required: true
    },
    L2_cache: {
        type: Int32,
        required: true
    },
    L3_cache: {
        type: Int32,
        required: true
    },
    ProcessorTechnology: {
        type: Int32,
        required: true
    },
    DefaultTDP: {
        type: Int32,
        required: true
    },
    MaxTDP: {
        type: Int32,
        required: true
    },
    AMD: AMD_schema,
    Intel: Intel_schema
});

const CPU = mongoose.model('CPU', CPU_schema);

module.exports = CPU;