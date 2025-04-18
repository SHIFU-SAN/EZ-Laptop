const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScreenSchema = new Schema({
    Type: {
        type: String,
        required: true
    },
    Resolution: {
        type: String,
        required: true
    },
    Brightness: {
        type: Number,
        required: true
    },
    RefreshRate: {
        type: Number,
        required: true
    },
    ColorAccuary: Number
});

const Screen = mongoose.model('Screen', ScreenSchema);

module.exports = Screen;