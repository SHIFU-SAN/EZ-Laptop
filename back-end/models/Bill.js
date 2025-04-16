const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {
    LaptopOrderSchema,
    RamOrderSchema,
    HardDriveOrderSchema,
    AdapterOrderSchema
} = require("./ReusableSchema");

const BillSchema = new Schema({
    UserID: {
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

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;