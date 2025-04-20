const express = require('express');
const app = express();
const router = express.Router();

const CPUController = require('../controllers/CPU_controller');

app.use(express.json());

router
    .post('/add', CPUController.addCPU)
    .get('/list', CPUController.getCPUs)
    .get('/:id', CPUController.getCPUByID)
    .put('/:id', CPUController.setCPU)
    .delete('/:id', CPUController.removeCPU);

module.exports = router;