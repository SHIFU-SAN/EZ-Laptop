const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaptopFK_schema = require("./ReusableSchema");

const PresentSchema = new Schema({
    LaptopID: LaptopFK_schema,
    Products: [{
        ProductID: {
            type: Schema.Types.ObjectId,
            required: true
        },
        Name: {
            type: String,
            required: true
        }
    }],
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

const Present = mongoose.model('Present', PresentSchema);

module.exports = Present;