const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaptopOrderSchema = new Schema({
    LaptopID: {
        type: Schema.Types.ObjectId,
        ref: 'Laptop'
    },
    Price: Double,
    Quantity: Int32
});

const RAM_OrderSchema = new Schema({
    RAM_ID: {
        type: Schema.Types.ObjectId,
        ref: 'RAM'
    },
    Price: Double,
    Quantity: Int32
});

const HardDriveOrderSchema = new Schema({
    HardDriveID: {
        type: Schema.Types.ObjectId,
        ref: 'HardDrive'
    },
    Price: Double,
    Quantity: Int32
})

const AdapterOrderSchema = new Schema({
    AdapterID: {
        type: Schema.Types.ObjectId,
        ref: 'Adapter'
    },
    Price: Double,
    Quantity: Int32
});

const ProductImageSchema = new Schema({
    ImageID: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    Link: String
});

module.exports = {
    LaptopOrderSchema,
    RAM_OrderSchema,
    HardDriveOrderSchema,
    AdapterOrderSchema,
    ProductImageSchema
}