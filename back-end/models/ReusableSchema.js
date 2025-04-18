const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    LaptopID: LaptopFK_schema,
    RAM_ID: RAM_FK_schema,
    HardDriveID: HardDriveFK_schema,
    AdapterID: AdapterFK_schema,
});

const ProductsOrderSchema = new Schema({
    LaptopOrder: {
        LaptopID: LaptopFK_schema,
        Quantity: Number
    },
    RAM_Order: {
        RAM_ID: RAM_FK_schema,
        Quantity: Number
    },
    HardDriveOrder: {
        HardDriveID: HardDriveFK_schema,
        Quantity: Number
    },
    AdapterOrder: {
        AdapterID: AdapterFK_schema,
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
    LaptopFK_schema,
    RAM_FK_schema,
    HardDriveFK_schema,
    AdapterFK_schema,
    ProductsFK_schema,
    ProductsOrderSchema,
    InstallationInfoSchema,
    ProductImageSchema
}