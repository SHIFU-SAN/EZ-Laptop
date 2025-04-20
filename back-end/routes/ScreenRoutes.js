const express = require('express');
const app = express();
const router = express.Router();

const ScreenController = require('../controllers/ScreenController');

app.use(express.json());

router
    .post('/add', ScreenController.addScreen)
    .get('/list', ScreenController.getScreens)
    .get('/:id', ScreenController.getScreenByID)
    .put('/:id', ScreenController.setScreen)
    .delete('/:id', ScreenController.removeScreen);

module.exports = router;