const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarrantyCardSchema = new Schema({
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