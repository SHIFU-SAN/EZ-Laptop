const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {
    LaptopOrderSchema,
    RamOrderSchema,
    HardDriveOrderSchema,
    AdapterOrderSchema
} = require("./ReusableSchema");

const OrderSchema = new Schema({
    CustomerID: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    ShippingAddress: {
        type: String,
        required: true
    },
    Products: [{
        LaptopOrder: LaptopOrderSchema,
        RAM_Order: RamOrderSchema,
        HardDriveOrder: HardDriveOrderSchema,
        AdapterOrder: AdapterOrderSchema
    }]
})