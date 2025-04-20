const express = require('express');
const app = express();
const router = express.Router();

const LaptopController = require('../controllers/LaptopController');

app.use(express.json());

router
    .post('/add', LaptopController.addLaptop)
    .get('/list', LaptopController.getLaptops)
    .get('/:id', LaptopController.getLaptopByID)
    .put('/:id', LaptopController.setLaptop)
    .post('/:id/port', LaptopController.addPort)
    .post('/:id/ports', LaptopController.addMorePorts)
    .post('/:id/image', LaptopController.addImage)
    .post('/:id/images', LaptopController.addMoreImages)
    .delete('/:id/ports/:port_id', LaptopController.removePort)
    .delete('/:id/ports', LaptopController.removePorts)
    .delete('/:id/image/:image_id', LaptopController.removeImage)
    .delete('/:id/images', LaptopController.removeImages)
    .delete('/:id', LaptopController.removeLaptop);

module.exports = router;