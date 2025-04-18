const express = require('express');
const app = express();
const router = express.Router();

const BillController = require('../controllers/BillController');

app.use(express.json());

router
    .post('/add', BillController.addBill)
    .get('/list', BillController.getBillsList)
    .get('/:id', BillController.getBillByID)
    .put('/:id', BillController.setBill)
    .put('/:id/order', BillController.addOrder)
    .put('/:id/orders', BillController.addMoreOrder)
    .delete('/:id/orders/:product_id', BillController.removeOrder)
    .delete('/:id/orders', BillController.removeOrders)
    .delete('/:id', BillController.removeBill);

module.exports = router;