const Delivery = require('../models/Delivery');

class DeliveryServices {
    static async createDelivery(info) {
        const NewDelivery = new Delivery({
            CustomerID: info.CustomerID,
            ShippingAddress: info.ShippingAddress,
            Bill_ID: info.Bill_ID
        });

        await NewDelivery.save();

        return NewDelivery ? NewDelivery : null;
    }

    static async readDeliveries() {
        const Deliveries = await Delivery.find();

        return Deliveries ? Deliveries : null;
    }

    static async readDeliveryByID(id) {
        const DeliveryTarget = await Delivery.findById(id);

        return DeliveryTarget ? DeliveryTarget : null;
    }

    static async updateDelivery(id, new_info) {
        let DeliveryTarget = await Delivery.findById(id);

        if (new_info.CustomerID) {
            DeliveryTarget.CustomerID = new_info.CustomerID;
        }
        if (new_info.ShippingAddress) {
            DeliveryTarget.ShippingAddress = new_info.ShippingAddress;
        }
        if (new_info.Bill_ID) {
            DeliveryTarget.Bill_ID = new_info.Bill_ID;
        }

        await DeliveryTarget.save();

        return DeliveryTarget ? DeliveryTarget : null;
    }

    static async deleteDelivery(id) {
        const DeliveryDeleted = await Delivery.findByIdAndDelete(id);

        return DeliveryDeleted ? DeliveryDeleted : null;
    }
}

module.exports = DeliveryServices;