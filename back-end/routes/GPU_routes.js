const express = require('express');
const app = express();
const router = express.Router();

const GPU_controller = require('../controllers/GPU_controller');

app.use(express.json());

router
    .post('/add', GPU_controller.addGPU)
    .get('/list', GPU_controller.getGPUs)
    .get('/:id', GPU_controller.getGPU_byID)
    .put('/:id', GPU_controller.setGPU)
    .delete('/:id', GPU_controller.removeGPU);

module.exports = router;