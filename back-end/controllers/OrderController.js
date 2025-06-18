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
}

module.exports = OrderController;