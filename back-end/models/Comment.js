const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    LaptopID: {
        type: String,
        required: true,
        ref: 'Laptop',
        index: 1
    },
    UserID: {
        type: String,
        required: true,
        ref: 'Account',
        index: 1
    },
    Content: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;