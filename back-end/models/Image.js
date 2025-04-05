const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    ProductID: {
        type: String,
        required: true
    },
    Link: {
        type: String,
        required: true
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;