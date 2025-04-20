const Port = require('../models/Port');

class PortServices {
    static async createPort(info) {
        const NewPort = new Port({
            Name: info.Name
        });

        await NewPort.save();

        return NewPort ? NewPort : null;
    }

    static async readPorts() {
        const Ports = await Port.find();

        return Ports ? Ports : null;
    }

    static async readPortByID(id) {
        const PortTarget = await Port.findById(id);

        return PortTarget ? PortTarget : null;
    }

    static async updatePort(id, new_info) {
        let PortTarget = await Port.findById(id);

        if (new_info.Name) {
            PortTarget.Name = new_info.Name;
        }

        await PortTarget.save();

        return PortTarget ? PortTarget : null;
    }

    static async deletePort(id) {
        const PortDeleted = await Port.findByIdAndDelete(id);

        return PortDeleted ? PortDeleted : null;
    }
}

module.exports = PortServices;
