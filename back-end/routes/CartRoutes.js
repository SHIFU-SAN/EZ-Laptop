const express = require('express');
const app = express();
const router = express.Router();

const CartController = require('../controllers/CartController');

app.use(express.json());

router
    .post('/add', CartController.addCart)
    .get('/list', CartController.getCarts)
    .get('/:id', CartController.getCartByID)
    .put('/:id', CartController.setCart)
    .post('/:id/order', CartController.addProduct)
    .post('/:id/orders', CartController.addMoreProducts)
    .delete('/:id/orders/:product_id', CartController.removeProduct)
    .delete('/:id/orders', CartController.removeProducts)
    .delete('/:id', CartController.removeCart);

module.exports = router;