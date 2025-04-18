const express = require('express');
const app = express();
const router = express.Router();

const AdapterController = require('../controllers/AdapterController');

app.use(express.json());

router
    .post('/add', AdapterController.addAdapter)
    .get('/list', AdapterController.getAdaptersList)
    .get('/:id', AdapterController.getAdapterByID)
    .put('/:id', AdapterController.setAdapter)
    .put('/:id/image', AdapterController.addImage)
    .put('/:id/images', AdapterController.addMoreImages)
    .delete('/:id/images/:image_id', AdapterController.removeImage)
    .delete('/:id/images', AdapterController.removeImages)
    .put('/:id/laptops/:laptop_id', AdapterController.addCompatibleLaptop)
    .put('/:id/laptops', AdapterController.addMoreCompatibleLaptop)
    .delete('/:id/laptops/:laptop_id', AdapterController.removeCompatibleLaptop)
    .delete('/:id/laptops', AdapterController.removeCompatibleLaptops)
    .delete('/:id', AdapterController.removeAdapter);

module.exports = router;