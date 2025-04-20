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
    .post('/:id/image', AdapterController.addImage)
    .post('/:id/images', AdapterController.addMoreImages)
    .delete('/:id/images/:image_id', AdapterController.removeImage)
    .delete('/:id/images', AdapterController.removeImages)
    .post('/:id/laptops', AdapterController.addCompatibleLaptop)
    .post('/:id/laptops', AdapterController.addMoreCompatibleLaptop)
    .delete('/:id/laptops/:laptop_id', AdapterController.removeCompatibleLaptop)
    .delete('/:id/laptops', AdapterController.removeCompatibleLaptops)
    .delete('/:id', AdapterController.removeAdapter);

module.exports = router;