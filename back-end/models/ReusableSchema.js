const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaptopFK_schema = new Schema({
    LaptopID: {
        type: Schema.Types.ObjectId,
        ref: 'Laptop',
        required: true
    }
});

const RAM_FK_schema = new Schema({
    RAM_ID: {
        type: Schema.Types.ObjectId,
        ref: 'RAM',
        required: true
    }
});

const HardDriveFK_schema = new Schema({
    HardDriveID: {
        type: Schema.Types.ObjectId,
        ref: 'HardDrive',
        required: true
    }
});

const AdapterFK_schema = new Schema({
    AdapterID: {
        type: Schema.Types.ObjectId,
        ref: 'Adapter',
        required: true
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
        Quantity: Int32
    },
    RAM_Order: {
        RAM_ID: RAM_FK_schema,
        Quantity: Int32
    },
    HardDriveOrder: {
        HardDriveID: HardDriveFK_schema,
        Quantity: Int32
    },
    AdapterOrder: {
        AdapterID: AdapterFK_schema,
        Quantity: Int32
    }
});

const InstallationInfoSchema = new Schema({
    SlotNumber: Int32,
    LaptopID: LaptopFK_schema
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
    LaptopFK_schema,
    RAM_FK_schema,
    HardDriveFK_schema,
    AdapterFK_schema,
    ProductsFK_schema,
    ProductsOrderSchema,
    InstallationInfoSchema,
    ProductImageSchema
}