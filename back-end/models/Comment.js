const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    UserID: {
        type: String,
        required: true,
        ref: 'Account',
        index: 1
    },
    LaptopID: {
        type: Schema.Types.ObjectId,
        ref: 'Laptop'
    },
    RAM_ID: {
        type: Schema.Types.ObjectId,
        ref: 'RAM'
    },
    HardDriveID: {
        type: Schema.Types.ObjectId,
        ref: 'HardDrive'
    },
    Adapter: {
        type: Schema.Types.ObjectId,
        ref: 'Adapter'
    },
    Content: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;