const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Permissions: {
        type: [String],
        default: []
    }
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;