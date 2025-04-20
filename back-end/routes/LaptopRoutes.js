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
    .post('/:id/image', LaptopController.addImage)
    .post('/:id/images', LaptopController.addMoreImages)
    .delete('/:id/image/:image_id', LaptopController.removeImage)
    .delete('/:id/images', LaptopController.removeImages)
    .delete('/:id', LaptopController.removeLaptop);

module.exports = router;