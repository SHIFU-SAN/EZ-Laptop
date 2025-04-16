const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {
    LaptopOrderSchema,
    RamOrderSchema,
    HardDriveOrderSchema,
    AdapterOrderSchema
} = require("./ReusableSchema");

const CartSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    CustomerID: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    Products: [{
        Laptops: LaptopOrderSchema,
        RAMs: RamOrderSchema,
        HardDrives: HardDriveOrderSchema,
        Adapters: AdapterOrderSchema
    }],
    Total: Double
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;