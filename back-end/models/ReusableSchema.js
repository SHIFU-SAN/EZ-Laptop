const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaptopFK_schema = new Schema({
    LaptopID: {
        type: Schema.Types.ObjectId,
        ref: 'Laptop'
    }
});

const ProductsFK_schema = new Schema({
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
    }
});

const ProductsOrderSchema = new Schema({
    LaptopOrder: {
        LaptopID: LaptopFK_schema,
        Quantity: Number
    },
    RAM_Order: {
        RAM_ID: {
            type: Schema.Types.ObjectId,
            ref: 'RAM'
        },
        Quantity: Number
    },
    HardDriveOrder: {
        HardDriveID: {
            type: Schema.Types.ObjectId,
            ref: 'HardDrive'
        },
        Quantity: Number
    },
    AdapterOrder: {
        AdapterID: {
            type: Schema.Types.ObjectId,
            ref: 'Adapter'
        },
        Quantity: Number
    }
});

const InstallationInfoSchema = new Schema({
    SlotNumber: Number,
    LaptopID: LaptopFK_schema
});

const ProductImageSchema = new Schema({
    Link: String
});

module.exports = {
    ProductsFK_schema,
    ProductsOrderSchema,
    InstallationInfoSchema,
    ProductImageSchema
}