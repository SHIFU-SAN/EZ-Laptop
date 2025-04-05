const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PresentDetailsSchema = new Schema({
    PresentID: {
        type: String,
        required: true,
        unique: true
    },
    Product: {
        type: String,
        required: true
    }
});

const PresentDetails = mongoose.model('PresentDetails', PresentDetailsSchema);

module.exports = PresentDetails;