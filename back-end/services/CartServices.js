const Cart = require("../models/Cart");

class CartServices {
    static async createCart(user_id) {
        const NewCart = new Cart({
            User: user_id
        });
        await NewCart.save();
        return NewCart;
    }
}

module.exports = CartServices;