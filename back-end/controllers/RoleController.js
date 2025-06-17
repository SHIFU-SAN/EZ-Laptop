const DateServices = require("../services/DateServices");
const RoleServices = require("../services/RoleServices");

class RoleController {
    static async getAllRoles(req, res) {
        try {
            const RolesFound = await RoleServices.findAllRoles();
            return res.status(200).json(RolesFound);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't get all roles! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't get all roles!",
                error: err.message
            });
        }
    }
}

module.exports = RoleController;