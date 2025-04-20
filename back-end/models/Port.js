const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortSchema = new Schema({
    Name: String
});

const Port = mongoose.model('Port', PortSchema);

module.exports = Port;