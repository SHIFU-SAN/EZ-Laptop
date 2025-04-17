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

const LaptopFK_schema = new Schema({
    LaptopID: {
        type: Schema.Types.ObjectId,
        ref: 'Laptop'
    }
});

const RAM_FK_schema = new Schema({
    RAM_ID: {
        type: Schema.Types.ObjectId,
        ref: 'RAM'
    }
});

const HardDriveFK_schema = new Schema({
    HardDriveID: {
        type: Schema.Types.ObjectId,
        ref: 'HardDrive'
    }
});

const AdapterFK_schema = new Schema({
    AdapterID: {
        type: Schema.Types.ObjectId,
        ref: 'Adapter'
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

module.exports = {
    LaptopOrderSchema,
    RAM_OrderSchema,
    HardDriveOrderSchema,
    AdapterOrderSchema,
    ProductImageSchema,
    LaptopFK_schema,
    RAM_FK_schema,
    HardDriveFK_schema,
    AdapterFK_schema,
    ProductsFK_schema
}