const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PresentSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        require: true,
        unique: true
    },
    LaptopID: {
        type: Schema.Types.ObjectId,
        ref: 'Laptop',
        required: true
    },
    Products: [{
        _id: {
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