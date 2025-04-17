const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsFK_schema = require("./ReusableSchema");

const WarrantyCardSchema = new Schema({
    ProductsFK: ProductsFK_schema,
    Errors: [{
        ErrorID: {
            type: Schema.Types.ObjectId,
            required: true
        },
        Content: {
            type: String,
            required: true
        }
    }],
    AppointmentDate: {
        type: Date,
        required: true
    }
});

const WarrantyCard = mongoose.model("WarrantyCard", WarrantyCardSchema);

module.exports = WarrantyCard;