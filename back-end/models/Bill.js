const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    UserID: {
        type: String,
        required: true,
        ref: 'Account'
    },
    Total: Double
});

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;