const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsFK_schema = require("./ReusableSchema");

const CommentsNotificationSchema = new Schema({
    Products: {
        type: [ProductsFK_schema],
        default: []
    },
    NumberOfNewComments: Number,
});

const CommentsNotification = mongoose.model('CommentsNotification', CommentsNotificationSchema);

module.exports = CommentsNotification;