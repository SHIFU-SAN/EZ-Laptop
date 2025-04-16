const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarrantyCardSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    LaptopID: {
        type: Schema.Types.ObjectId,
        ref: 'Laptop',
    },
    RAM_ID: {
        type: Schema.Types.ObjectId,
        ref: 'RAM'
    },
    HardDriveID: {
        type: Schema.Types.ObjectId,
        ref: 'HardDrive',
    },
    AdapterID: {
        type: Schema.Types.ObjectId,
        ref: 'Adapter',
    },
    Errors: [{
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        content: {
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