const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsFK_schema = require("./ReusableSchema");

const NewCommentsNotificationSchema = new Schema({
    Products: {
        type: [ProductsFK_schema],
        default: []
    },
    NumberOfNewComments: Number,
});

module.exports = NewCommentsNotificationSchema;