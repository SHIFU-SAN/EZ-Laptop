const Role = require("../models/Role");

class RoleServices {
    static async findAllRoles() {
        const RolesFound = await Role.find();
        return RolesFound;
    }
}

module.exports = RoleServices;