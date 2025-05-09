const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsFK_schema = require("./ReusableSchema");

const GuaranteeSchema = new Schema({
    Products: {
        type: [ProductsFK_schema],
        default: []
    },
    CustomerID: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    Start: {
        type: Date,
        required: true
    },
    End: {
        type: Date,
        required: true
    },
    Status: {
        type: Boolean,
        default: true
    }
});

const Warranty = mongoose.model('Warranty', GuaranteeSchema);

module.exports = Warranty;