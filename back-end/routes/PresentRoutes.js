const express = require('express');
const app = express();
const router = express.Router();

const PresentController = require('../controllers/PresentController');

app.use(express.json());

router
    .post('/add', PresentController.addPresent)
    .get('/list', PresentController.getPresents)
    .get('/:id', PresentController.getPresentByID)
    .put('/:id', PresentController.setPresent)
    .post('/:id/product', PresentController.addProduct)
    .post('/:id/products', PresentController.addMoreProducts)
    .delete('/:id/products/:product_id', PresentController.removeProduct)
    .delete('/:id/products', PresentController.removeProducts)
    .delete('/:id', PresentController.removePresent);

module.exports = router;