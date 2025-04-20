const express = require('express');
const app = express();
const router = express.Router();

const OrderController = require('../controllers/OrderController');

app.use(express.json());

router
    .post('/add', OrderController.addOrder)
    .get('/list', OrderController.getOrdersList)
    .get('/:id', OrderController.getOrderByID)
    .put('/:id', OrderController.setOrder)
    .delete('/:id', OrderController.removeOrder);

module.exports = router;