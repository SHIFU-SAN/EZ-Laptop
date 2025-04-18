const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GPU_Schema = new Schema({
    Branch: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    VRAM: {
        type: Number,
        required: true
    },
    TDP: {
        type: Number,
        required: true
    }
});

const GPU = mongoose.model('GPU', GPU_Schema);

module.exports = GPU;