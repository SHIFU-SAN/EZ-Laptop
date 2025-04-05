const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScreenSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    Type: {
        type: String,
        required: true
    },
    Resolution: {
        type: String,
        required: true
    },
    Brightness: {
        type: Int32,
        required: true
    },
    RefreshRate: {
        type: Int32,
        required: true
    },
    ColorAccuary: Double
});

const Screen = mongoose.model('Screen', ScreenSchema);

module.exports = Screen;