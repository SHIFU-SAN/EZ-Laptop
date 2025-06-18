const Order = require("../models/Order");

class OrderServices {
    static async createOrder(info) {
        const NewOrder = new Order({
            User: info?.User,
            Laptop: info?.Laptop,
            Receiver: info?.Receiver,
            Phone: info?.Phone,
            Address: info?.Address
        });
        await NewOrder.save();
        const FoundOrder = await Order
            .findById(NewOrder?._id)
            .populate('User')
            .populate('Laptop')
            .exec();
        return FoundOrder;
    }
}

module.exports = OrderServices;