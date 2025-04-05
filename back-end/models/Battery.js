const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BatterySchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    Capacity: {
        type: Int32,
        required: true
    }
});

const Battery = mongoose.model('Battery', BatterySchema);

module.exports = Battery;