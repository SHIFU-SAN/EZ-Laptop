const Order = require("../models/Order");

class OrderServices {
    static async createOrder(info) {
        const NewOrder = new Order({
            User: info?.User,
            Laptop: info?.Laptop,
            Receiver: info?.Receiver,
            Phone: info?.Phone,
            Address: info?.Address,
            Total: info?.Total
        });
        await NewOrder.save();
        const FoundOrder = await Order
            .findById(NewOrder?._id)
            .populate('User')
            .populate('Laptop')
            .exec();
        return FoundOrder;
    }

    static async findAllOrders() {
        const FoundOrders = await Order.find().populate('User').populate('Laptop').exec();
        return FoundOrders;
    }

    static async findOrderByID(id) {
        const FoundOrder = await Order.findById(id);
        return FoundOrder;
    }

    static async findOrdersByUser(user_id) {
        const FoundOrders = await Order.find({User: user_id}).populate('User').populate('Laptop').exec();
        return FoundOrders;
    }

    static async updateOrder(id, new_info) {
        let FoundOrder = await Order.findById(id);
        if (new_info?.User && new_info.User !== FoundOrder?.User) {
            FoundOrder.User = new_info.User;
        }
        if (new_info?.Laptop && new_info.Laptop !== FoundOrder?.Laptop) {
            FoundOrder.Laptop = new_info.Laptop;
        }
        if (new_info?.Receiver && new_info.Receiver !== FoundOrder?.Receiver) {
            FoundOrder.Receiver = new_info.Receiver;
        }
        if (new_info?.Phone && new_info.Phone !== FoundOrder?.Phone) {
            FoundOrder.Phone = new_info.Phone;
        }
        if (new_info?.Address && new_info.Address !== FoundOrder?.Address) {
            FoundOrder.Address = new_info.Address;
        }
        if (new_info?.Total && new_info.Total !== FoundOrder?.Total) {
            FoundOrder.Total = new_info.Total;
        }
        if (new_info?.Confirm && new_info.Confirm !== FoundOrder?.Confirm) {
            FoundOrder.Confirm = new_info.Confirm;
        }
        await FoundOrder.save();
        FoundOrder = await Order.findById(id).populate('User').populate('Laptop').exec();
        return FoundOrder;
    }

    static async deleteOrder(id) {
        const DeletedOrder = await Order.findByIdAndDelete(id);
        return DeletedOrder
    }

}

module.exports = OrderServices;