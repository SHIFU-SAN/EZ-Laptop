const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GPU_Schema = new Schema({
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
    VRAM: {
        type: Int32,
        required: true
    },
    TDP: {
        type: Int32,
        required: true
    }
});

const GPU = mongoose.model('GPU', GPU_Schema);

module.exports = GPU;