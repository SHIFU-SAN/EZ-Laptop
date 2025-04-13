const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdapterForLaptopSchema = new Schema({
    AdapterID: {
        type: String,
        required: true,
        ref: 'Adapter',
        index: 1
    },
    LaptopId: {
        type: String,
        required: true,
        ref: 'Laptop',
        index: 1
    }
});

const AdapterForLaptop = mongoose.model('AdapterForLaptop', AdapterForLaptopSchema);

module.exports = AdapterForLaptop;