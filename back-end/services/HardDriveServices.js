const HardDrive = require('../models/HardDrive');

class HardDriveServices {
    static async createHardDrive(info) {
        const NewHardDrive = new HardDrive({
            Branch: info.Branch,
            Name: info.Name,
            PortType: info.PortType,
            Capacity: info.Capacity,
            ReadSpeed: info.ReadSpeed,
            WriteSpeed: info.WriteSpeed,
            TBW: info.TBW,
            LaptopInstallations: info.LaptopInstallations,
            Price: info.Price,
            Images: info.Images,
            Status: info.Status
        });

        await NewHardDrive.save();

        return NewHardDrive ? NewHardDrive : null;
    }

    static async readHardDrives() {
        const HardDrives = await HardDrive.find();

        return HardDrives ? HardDrives : null;
    }

    static async readHardDriveByID(id) {
        const HardDrive_target = await HardDrive.findById(id);

        return HardDrive_target ? HardDrive_target : null;
    }

    static async updateHardDrive(id, new_info) {
        let HardDrive_target = await HardDrive.findById(id);

        if (new_info.Branch) {
            HardDrive_target.Branch = new_info.Branch;
        }
        if (new_info.Name) {
            HardDrive_target.Name = new_info.Name;
        }
        if (new_info.PortType) {
            HardDrive_target.PortType = new_info.PortType;
        }
        if (new_info.Capacity) {
            HardDrive_target.Capacity = new_info.Capacity;
        }
        if (new_info.ReadSpeed) {
            HardDrive_target.ReadSpeed = new_info.ReadSpeed;
        }
        if (new_info.WriteSpeed) {
            HardDrive_target.WriteSpeed = new_info.WriteSpeed;
        }
        if (new_info.TBW) {
            HardDrive_target.TBW = new_info.TBW;
        }
        if (new_info.LaptopInstallations) {
            HardDrive_target.LaptopInstallations = new_info.LaptopInstallations;
        }
        if (new_info.Price) {
            HardDrive_target.Price = new_info.Price;
        }
        if (new_info.Images) {
            HardDrive_target.Images = new_info.Images;
        }
        if (new_info.Status) {
            HardDrive_target.Status = new_info.Status;
        }

        await HardDrive_target.save();

        return HardDrive_target ? HardDrive_target : null;
    }

    static async createLaptopInstallation(id, new_installation) {
        let HardDrive_target = await HardDrive.findById(id);

        const OldLength = HardDrive_target.LaptopInstallations.length;

        HardDrive_target.LaptopInstallations.push(new_installation);

        await HardDrive_target.save();

        const NewLength = HardDrive_target.LaptopInstallations.length;

        return OldLength < NewLength ? new_installation : null;
    }

    static async deleteLaptopInstallation(id, laptop_id) {
        let HardDrive_target = await HardDrive.findById(id);

        const OldLength = HardDrive_target.LaptopInstallations.length;

        let Installations = HardDrive_target.LaptopInstallations;
        let LaptopRemoved = {}
        Installations.map(laptop => {
            if (laptop.LaptopID === laptop_id) {
                LaptopRemoved = laptop;
                Installations.pull(laptop._id)
            }
        });

        await HardDrive_target.save();

        const NewLength = HardDrive_target.LaptopInstallations.length;

        return OldLength > NewLength ? LaptopRemoved : null;
    }

    static async deleteLaptopInstallations(id) {
        let HardDrive_target = await HardDrive.findById(id);

        const OldInstallations = HardDrive_target.LaptopInstallations;

        HardDrive_target.LaptopInstallations = [];

        await HardDrive_target.save();

        const NewLength = HardDrive_target.LaptopInstallations.length;

        return NewLength === 0 ? OldInstallations : null;
    }

    static async deleteHardDrive(id) {
        const HardDrive_deleted = await HardDrive.findByIdAndDelete(id);

        return HardDrive_deleted ? HardDrive_deleted : null;
    }
}

module.exports = HardDriveServices;