const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {
    LaptopOrderSchema,
    RAM_OrderSchema,
    HardDriveOrderSchema,
    AdapterOrderSchema
} = require("./ReusableSchema");

const CartSchema = new Schema({
    CustomerID: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    Products: [{
        LaptopOrder: LaptopOrderSchema,
        RAM_order: RAM_OrderSchema,
        HardDriveOrder: HardDriveOrderSchema,
        AdapterOrder: AdapterOrderSchema
    }],
    Total: Double
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;