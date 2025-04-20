const express = require('express');
const app = express();
const router = express.Router();

const CommentsNotificationController = require('../controllers/CommentsNotificationController');

app.use(express.json());

router
    .post('/add', CommentsNotificationController.addNotification)
    .get('/list', CommentsNotificationController.getNotifications)
    .get('/:id', CommentsNotificationController.getNotificationByID)
    .put('/:id', CommentsNotificationController.setNotification)
    .post('/:id/product', CommentsNotificationController.addProduct)
    .post('/:id/products', CommentsNotificationController.addMoreProducts)
    .delete('/:id/products/:product_id', CommentsNotificationController.removeProduct)
    .delete('/:id/products', CommentsNotificationController.removeProducts)
    .delete('/:id', CommentsNotificationController.removeNotification);

module.exports = router;