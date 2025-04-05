const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CPU = new Schema({
    ID: {
        type: String,
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
    }
})