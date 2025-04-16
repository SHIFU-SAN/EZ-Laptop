const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScreenSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
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