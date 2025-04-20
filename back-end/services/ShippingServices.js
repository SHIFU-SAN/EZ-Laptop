const Order = require('../models/Shipping');

class OrderServices {
    static async createOrder(info) {
        const NewOrder = new Order({
            CustomerID: info.CustomerID,
            ShippingAddress: info.ShippingAddress,
            Bill_ID: info.Bill_ID
        });

        await NewOrder.save();

        return NewOrder ? NewOrder : null;
    }

    static async readOrders() {
        const Orders = await Order.find();

        return Orders ? Orders : null;
    }

    static async readOrderByID(id) {
        const OrderTarget = await Order.findById(id);

        return OrderTarget ? OrderTarget : null;
    }

    static async updateOrder(id, new_info) {
        let OrderTarget = await Order.findById(id);

        if (new_info.CustomerID) {
            OrderTarget.CustomerID = new_info.CustomerID;
        }
        if (new_info.ShippingAddress) {
            OrderTarget.ShippingAddress = new_info.ShippingAddress;
        }
        if (new_info.Bill_ID) {
            OrderTarget.Bill_ID = new_info.Bill_ID;
        }

        await OrderTarget.save();

        return OrderTarget ? OrderTarget : null;
    }

    static async deleteOrder(id) {
        const OrderDeleted = await Order.findByIdAndDelete(id);

        return OrderDeleted ? OrderDeleted : null;
    }
}

module.exports = OrderServices;