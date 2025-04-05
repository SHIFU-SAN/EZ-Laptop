const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuaranteeSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    LaptopID: {
        type: String,
        required: true,
        ref: 'Laptop'
    },
    NumberOfYears: {
        type: Int32,
        required: true
    },
    Start: {
        type: Date,
        required: true
    },
    End: {
        type: Date,
        required: true
    }
});

const Guarantee = mongoose.model('Guarantee', GuaranteeSchema);

module.exports = Guarantee;