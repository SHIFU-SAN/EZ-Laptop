const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', EventSchema);

module.exports.Event = Event;