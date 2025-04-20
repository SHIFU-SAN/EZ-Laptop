const express = require('express');
const app = express();
const router = express.Router();

const CommentController = require('../controllers/CommentController');

app.use(express.json());

router
    .post('/add', CommentController.addComment)
    .get('/list', CommentController.getComments)
    .get('/:id', CommentController.getCommentByID)
    .put('/:id', CommentController.setComment)
    .post('/:id/product', CommentController.addProduct)
    .post('/:id/products', CommentController.addMoreProducts)
    .delete('/:id/products/:product_id', CommentController.removeProduct)
    .delete('/:id/products', CommentController.removeProducts)
    .delete('/:id', CommentController.removeComment);

module.exports = router;