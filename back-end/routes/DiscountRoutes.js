const express = require('express');
const app = express();
const router = express.Router();

const DiscountController = require('../controllers/DiscountController');

app.use(express.json());

router
    .post('add', DiscountController.addDiscount)
    .get('/list', DiscountController.getDiscounts)
    .get('/:id', DiscountController.getDiscountById)
    .put('/:id', DiscountController.setDiscount)
    .post('/:id/product', DiscountController.addProduct)
    .post('/:id/products', DiscountController.addMoresProducts)
    .delete('/:id/products/:product_id', DiscountController.removeProduct)
    .delete('/:id/products', DiscountController.removeProducts)
    .delete('/:id', DiscountController.removeDiscount);

module.exports = router;