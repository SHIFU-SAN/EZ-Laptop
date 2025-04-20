const express = require('express');
const app = express();
const router = express.Router();

const WarrantyCardController = require('../controllers/WarrantyCardController');

app.use(express.json());

router
    .post('/add', WarrantyCardController.addWarrantyCard)
    .get('/list', WarrantyCardController.getWarrantyCards)
    .get('/:id', WarrantyCardController.getWarrantyCardByID)
    .put('/:id', WarrantyCardController.setWarrantyCard)
    .post(':id/product', WarrantyCardController.addProduct)
    .post('/:id/products', WarrantyCardController.addMoreProducts)
    .post('/:id/error', WarrantyCardController.addError)
    .post('/:id/errors', WarrantyCardController.addMoreErrors)
    .delete('/:id/products/:product_id', WarrantyCardController.removeProduct)
    .delete('/:id/products', WarrantyCardController.removeProducts)
    .delete('/:id/errors/:error_id', WarrantyCardController.removeError)
    .delete('/:id/errors', WarrantyCardController.removeErrors)
    .delete('/:id', WarrantyCardController.removeWarrantyCard);

module.exports = router;