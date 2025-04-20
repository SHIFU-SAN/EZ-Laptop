const express = require('express');
const app = express();
const router = express.Router();

const DeliveryController = require('../controllers/DeliveryController');

app.use(express.json());

router
    .post('/add', DeliveryController.addDelivery)
    .get('/list', DeliveryController.getDeliveries)
    .get('/:id', DeliveryController.getDeliveryByID)
    .put('/:id', DeliveryController.setDelivery)
    .delete('/:id', DeliveryController.removeDelivery);

module.exports = router;