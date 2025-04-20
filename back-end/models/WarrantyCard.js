const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsFK_schema = require("./ReusableSchema");

const ErrorSchema = new Schema({
    Content: {
        type: String,
        required: true
    }
});

const WarrantyCardSchema = new Schema({
    Products: ProductsFK_schema,
    Errors: {
        type: [ErrorSchema],
        default: []
    },
    AppointmentDate: {
        type: Date,
        required: true
    }
});

const WarrantyCard = mongoose.model("WarrantyCard", WarrantyCardSchema);

module.exports = WarrantyCard;