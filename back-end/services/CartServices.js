const Cart = require("../models/Cart");

class CartServices {
    static async createCart(info) {
        let NewCart = new Cart({
            CustomerID: info.CustomerID,
            ProductsOrder: info.ProductsOrder,
            Total: info.Total
        });

        await NewCart.save();

        return NewCart ? NewCart : null;
    }

    static async readCarts() {
        const Carts = Cart.find();
        return Carts ? Carts : null;
    }

    static async readCartByID(id) {
        const Cart = Cart.findById(id);
        return Cart ? Cart : null;
    }

    static async updateCart(id, new_info) {
        let CartTarget = Cart.findById(id);

        if (new_info.CustomerID) {
            CartTarget.CustomerID = new_info.CustomerID;
        }
        if (new_info.Products) {
            CartTarget.ProductsOrder = new_info.ProductsOrder;
        }
        if (new_info.Total) {
            CartTarget.Total = new_info.Total;
        }

        await CartTarget.save();

        return CartTarget ? CartTarget : null;
    }

    static async createProduct(id, new_order) {
        let CartTarget = Cart.findById(id);

        const OldLength = CartTarget.ProductsOrder.length;

        CartTarget.ProductsOrder.push(new_order);
        await CartTarget.save();

        const NewLength = CartTarget.ProductsOrder.length;

        return OldLength < NewLength ? new_order : null;
    }

    static async deleteProduct(id, product_id) {
        let CartTarget = Cart.findById(id);

        const OldLength = CartTarget.ProductsOrder.length;

        let ProductsList = CartTarget.ProductsOrder;
        let ProductsDeleted = {};

        ProductsList.map(product => {
            if (product.LaptopOrder.LaptopID === product_id) {
                ProductsDeleted = product;
                ProductsList.pull(product._id)
            } else if (product.RAM_Order.RAM_ID === product_id) {
                ProductsDeleted = product;
                ProductsList.pull(product._id)
            } else if (product.HardDriveOrder.HardDriveID === product_id) {
                ProductsDeleted = product;
                ProductsList.pull(product._id);
            } else if (product.AdapterOrder.AdapterID === product_id) {
                ProductsDeleted = product;
                ProductsList.pull(product._id);
            }
        });

        await CartTarget.save();

        const NewLength = CartTarget.ProductsOrder.length;

        return OldLength > NewLength ? ProductsDeleted : null;
    }

    static async deleteProducts(id) {
        let CartTarget = Cart.findById(id);

        const OldProducts = CartTarget.ProductsOrder;

        CartTarget.ProductsOrder = [];
        await CartTarget.save();

        const NewLength = CartTarget.ProductsOrder.length;

        return NewLength === 0 ? OldProducts : null;
    }

    static async deleteCart(id) {
        const CartDeleted = Cart.findByIdAndDelete(id);

        return CartDeleted ? CartDeleted : null;
    }
}

module.exports = CartServices;