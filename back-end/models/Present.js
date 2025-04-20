const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    Name: String
});

const PresentSchema = new Schema({
    LaptopID: {
        type: Schema.Types.ObjectId,
        ref: 'Laptop'
    },
    Products: {
        type: [ItemSchema],
        default: []
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

const Present = mongoose.model('Present', PresentSchema);

module.exports = Present;