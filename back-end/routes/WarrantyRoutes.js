const express = require('express');
const app = express();
const router = express.Router();

const WarrantyController = require('../controllers/WarrantyController');

app.use(express.json());

router
    .post('/add', WarrantyController.addWarranty)
    .get('/list', WarrantyController.getWarranties)
    .get('/:id', WarrantyController.getWarrantyByID)
    .put('/:id', WarrantyController.setWarranty)
    .post('/:id/product', WarrantyController.addProduct)
    .post('/:id/products', WarrantyController.addMoreProducts)
    .delete('/:id/products/:product_id', WarrantyController.removeProduct)
    .delete('/:id/products', WarrantyController.removeProducts)
    .delete('/:id', WarrantyController.removeWarranty);

module.exports = router;