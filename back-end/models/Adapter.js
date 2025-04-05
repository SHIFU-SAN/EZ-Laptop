const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdapterSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    Branch: String,
    OutputPower: {
        type: Int32,
        required: true
    },
    OutputVoltage: Double,
    OutputCurrent: Double,
    Price: Double
});

const Adapter = mongoose.model('Adapter', AdapterSchema);
module.exports = Adapter;