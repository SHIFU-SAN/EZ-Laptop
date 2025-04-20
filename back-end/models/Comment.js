const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsFK_schema = require("./ReusableSchema");

const CommentSchema = new Schema({
    UserID: {
        type: String,
        required: true,
        ref: 'Account',
        index: 1
    },
    Products: {
        type: [ProductsFK_schema],
        default: []
    },
    Content: {
        type: String,
        required: true
    },
    Time: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;