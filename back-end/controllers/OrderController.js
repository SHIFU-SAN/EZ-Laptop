const DateServices = require("../services/DateServices");
const OrderServices = require("../services/OrderServices");

class OrderController {
    static async addOrder(req, res) {
        try {
            req.body['User'] = req?.user_id;
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