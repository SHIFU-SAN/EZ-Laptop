const Bill = require('../models/Bill');

class BillServices {
    static async createBill(info) {
        const NewBill = new Bill({
            UserID: info.UserID,
            Total: info.Total,
            ProductsOrder: info.ProductsOrder,
        });

        await NewBill.save();

        return NewBill ? NewBill : null;
    }

    static async readBills() {
        const BillsList = await Bill.find();
        return BillsList ? BillsList : null;
    }

    static async readBillByID(id) {
        const BillTarget = await Bill.findById(id);
        return BillTarget ? BillTarget : null;
    }

    static async updateBill(id, new_info) {
        const BillTarget = await Bill.findById(id);

        if (new_info.UserID) {
            BillTarget.UserID = new_info.UserID;
        }
        if (new_info.Total) {
            BillTarget.Total = new_info.Total;
        }

        await BillTarget.save();

        return BillTarget ? BillTarget : null;
    }

    static async createOrder(id, new_order) {
        const BillTarget = await Bill.findById(id);

        const OldLength = BillTarget.ProductsOrder.length;

        BillTarget.ProductsOrder.push(new_order);
        await BillTarget.save();

        const NewLength = BillTarget.ProductsOrder.length;

        return OldLength < NewLength ? new_order : null;
    }

    static async deleteOrder(id, product_id) {
        const BillTarget = await Bill.findById(id);

        const OldLength = BillTarget.ProductsOrder.length;

        let ProductsList = BillTarget.ProductsOrder;
        let ProductRemoved = {};
        ProductsList.map(product => {
            if (product.LaptopOrder.LaptopID === product_id) {
                ProductRemoved = product;
                ProductsList.pull(product._id);
            } else if (product.RAM_Order.RAM_ID === product_id) {
                ProductRemoved = product;
                ProductsList.pull(product._id);
            } else if (product.HardDriveOrder.HardDriveID === product_id) {
                ProductRemoved = product;
                ProductsList.pull(product._id);
            } else if (product.AdapterOrder.AdapterID === product_id) {
                ProductRemoved = product;
                ProductsList.pull(product._id);
            }
        });
        await BillTarget.save();
        const NewLength = BillTarget.ProductsOrder.length;

        return OldLength > NewLength ? ProductRemoved : null;
    }

    static async deleteOrders(id) {
        let BillTarget = await Bill.findById(id);
        const OldOrders = BillTarget.ProductsOrder;
        BillTarget.ProductsOrder = [];
        await BillTarget.save();
        const NewLength = BillTarget.ProductsOrder.length;
        return NewLength === 0 ? OldOrders : null;
    }

    static async deleteBill(id) {
        const BillDeleted = await Bill.findByIdAndDelete(id);
        return BillDeleted ? BillDeleted : null;
    }
}

module.exports = BillServices;