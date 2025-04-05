const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillDetailsSchema = new Schema({
    Bill_ID: {
        type: String,
        required: true,
        index: 1,
        ref: 'Bill',

    },
    LaptopID: {
        type: String,
        required: true,
        index: 1,
        ref: "Laptop",
    },
    Quantity: Int32,
    Price: Double
});

const BillDetails = mongoose.model('BillDetails', BillDetailsSchema);

module.exports = BillDetails;