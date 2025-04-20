const express = require('express');
const app = express();
const router = express.Router();

const RAM_controller = require('../controllers/RAM_controller');

app.use(express.json());

router
    .post('/add', RAM_controller.addRAM)
    .get('/list', RAM_controller.getRAMs)
    .get(':id', RAM_controller.getRAM_byID)
    .put('/:id', RAM_controller.setRAM)
    .post('/:id/image', RAM_controller.addImage)
    .post('/:id/images', RAM_controller.addMoreImages)
    .delete('/:id/image/:image_id', RAM_controller.removeImage)
    .delete('/:id/images', RAM_controller.removeImages)
    .delete('/:id', RAM_controller.removeRAM);

module.exports = router;