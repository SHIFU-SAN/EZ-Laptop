const AccountServices = require("../services/AccountServices");
const DateServices = require("../services/DateServices");
const LaptopServices = require("../services/LaptopServices");
const OrderServices = require("../services/OrderServices");

class OrderController {
    static async addOrder(req, res) {
        try {
            req.body['User'] = req?.user_id;
            const FoundLaptop = await LaptopServices.findLaptopByID(req.body?.Laptop);
            req.body['Total'] = FoundLaptop?.Price;
            const NewOrder = await OrderServices.createOrder(req.body);
            return res.status(201).json(NewOrder);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't add new order! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't add new order!",
                error: err.message
            });
        }
    }

    static async getAllOrders(req, res) {
        try {
            const FoundOrders = await OrderServices.findAllOrders();
            return res.status(200).json(FoundOrders);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't get all orders! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't get all orders!",
                error: err.message
            });
        }
    }

    static async getOrdersByUser(req, res) {
        try {
            const FoundOrders = await OrderServices.findOrdersByUser(req.user_id);
            return res.status(200).json(FoundOrders);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't get orders by user! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't get orders by user!",
                error: err.message
            })
        }
    }

    static async checkPersonalAuthority(req, res, next) {
        try {
            const FoundOrder = await OrderServices.findOrderByID(req.body?.OrderID);
            const FoundUser = await AccountServices.findAccountByID(req.user_id);
            if (FoundOrder?.User !== FoundUser?._id) {
                return res.status(403).send({
                    message: "Forbidden!"
                });
            } else if (!FoundOrder?.Confirm) {
                return res.status(403).send({
                    message: "No more authority!",
                    isAllowed: false
                });
            } else {
                return next();
            }
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't check personal assistant! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't check personal assistant!",
                error: err.message
            });
        }
    }

    static async setOrder(req, res) {
        try {
            const SetOrder = await OrderServices.updateOrder(req.body?.OrderID, req.body);
            return res.status(200).json(SetOrder);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't set order!`);
            return res.status(400).send({
                message: "Can't set order!",
                error: err.message
            });
        }
    }

    static async removeOrder(req, res) {
        try {
            const RemovedOrder = await OrderServices.deleteOrder(req.body?.OrderID);
            return res.status(200).json(RemovedOrder);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't remove order!`);
            return res.status(400).send({
                message: "Can't remove order!",
                error: err.message
            });
        }
    }
}

module.exports = OrderController;