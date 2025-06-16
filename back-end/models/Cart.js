const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'account',
        required: true,
        unique: true
    },
    Products: {
        type: [Schema.Types.ObjectId],
        ref: 'laptop',
        default: []
    }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;