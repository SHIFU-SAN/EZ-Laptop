const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuaranteeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    LaptopID: {
        type: Schema.Types.ObjectId,
        ref: 'Laptop'
    },
    RAM_ID: {
        type: Schema.Types.ObjectId,
        ref: 'RAM'
    },
    HardDriveID: {
        type: Schema.Types.ObjectId,
        ref: 'HardDrive'
    },
    AdapterID: {
        type: Schema.Types.ObjectId,
        ref: 'Adapter'
    },
    CustomerID: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
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

const Warranty = mongoose.model('Warranty', GuaranteeSchema);

module.exports = Warranty;