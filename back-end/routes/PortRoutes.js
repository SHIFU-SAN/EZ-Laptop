const express = require('express');
const app = express();
const router = express.Router();

const PortController = require('../controllers/PortController');

app.use(express.json());

router
    .post('/add', PortController.addPort)
    .get('/list', PortController.getPorts)
    .get(':id', PortController.getPortByID)
    .put('/:id', PortController.setPort)
    .delete('/:id', PortController.removePort);

module.exports = router;