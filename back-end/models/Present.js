const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PresentSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    LaptopID: {
        type: String,
        required: true,
        ref: 'Laptop'
    }
});

const Present = mongoose.model('Present', PresentSchema);

module.exports = Present;