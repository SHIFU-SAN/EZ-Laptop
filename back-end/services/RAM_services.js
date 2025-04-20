const RAM = require('../models/RAM');

class RAM_services {
    static async createRAM(info) {
        const NewRAM = new RAM({
            Branch: info.Branch,
            Name: info.Name,
            PortType: info.PortType,
            Capacity: info.Capacity,
            BUS: info.BUS,
            LaptopInstallations: info.LaptopInstallations,
            Price: info.Price,
            Images: info.Images,
            Status: info.Status
        });

        await NewRAM.save();

        return NewRAM ? NewRAM : null;
    }

    static async readRAMs() {
        const RAMs = await RAM.find();

        return RAMs ? RAMs : null;
    }

    static async readRAMByID(id) {
        const RAM_target = await RAM.findById(id);

        return RAM_target ? RAM_target : null;
    }

    static async updateRAM(id, new_info) {
        let RAM_target = await RAM.findById(id);

        if (new_info.Branch) {
            RAM_target.Branch = new_info.Branch;
        }
        if (new_info.Name) {
            RAM_target.Name = new_info.Name;
        }
        if (new_info.PortType) {
            RAM_target.PortType = new_info.PortType;
        }
        if (new_info.Capacity) {
            RAM_target.Capacity = new_info.Capacity;
        }
        if (new_info.BUS) {
            RAM_target.BUS = new_info.BUS;
        }
        if (new_info.LaptopInstallations) {
            RAM_target.LaptopInstallations = new_info.LaptopInstallations;
        }
        if (new_info.Price) {
            RAM_target.Price = new_info.Price;
        }
        if (new_info.Images) {
            RAM_target.Images = new_info.Images;
        }
        if (new_info.Status) {
            RAM_target.Status = new_info.Status;
        }

        await RAM_target.save();

        return RAM_target ? RAM_target : null;
    }

    static async createLaptopInstallation(id, new_installation) {
        let RAM_target = await RAM.findById(id);

        const OldLength = RAM_target.LaptopInstallations.length;

        RAM_target.LaptopInstallations.push(new_installation);

        await RAM_target.save();

        const NewLength = RAM_target.LaptopInstallations.length;

        return OldLength < NewLength ? new_installation : null;
    }

    static async deleteLaptopInstallation(id, laptop_id) {
        let RAM_target = await RAM.findById(id);

        const OldLength = RAM_target.LaptopInstallations.length;

        let Installations = RAM_target.LaptopInstallations;
        let LaptopRemoved = {}
        Installations.map(laptop => {
            if (laptop.LaptopID === laptop_id) {
                LaptopRemoved = laptop;
                Installations.pull(laptop._id)
            }
        });

        await RAM_target.save();

        const NewLength = RAM_target.LaptopInstallations.length;

        return OldLength > NewLength ? LaptopRemoved : null;
    }

    static async deleteLaptopInstallations(id) {
        let RAM_target = await RAM.findById(id);

        const OldInstallations = RAM_target.LaptopInstallations;

        RAM_target.LaptopInstallations = [];

        await RAM_target.save();

        const NewLength = RAM_target.LaptopInstallations.length;

        return NewLength === 0 ? OldInstallations : null;
    }

    static async createImage(id, new_image) {
        let RAM_target = await RAM.findById(id);

        const OldLength = RAM_target.Images.length;

        RAM_target.Images.push(new_image);

        await RAM_target.save();

        const NewLength = RAM_target.Images.length;

        return OldLength < NewLength ? new_image : null;
    }

    static async deleteImage(id, image_id) {
        let RAM_target = await RAM.findById(id);

        const OldLength = RAM_target.Images.length;

        let Images = RAM_target.Images;
        let ImageDeleted = {}
        Images.map(image => {
            if (image._id === image_id) {
                ImageDeleted = image;
                Images.pull(image._id)
            }
        });

        await RAM_target.save();

        const NewLength = RAM_target.Images.length;

        return OldLength > NewLength ? ImageDeleted : null;
    }

    static async deleteImages(id) {
        let RAM_target = await RAM.findById(id);

        const OldImages = RAM_target.Images;

        RAM_target.Images = [];

        await RAM_target.save();

        const NewLength = RAM_target.Images.length;

        return NewLength === 0 ? OldImages : null;
    }

    static async deleteRAM(id) {
        const RAM_deleted = await RAM.findByIdAndDelete(id);

        return RAM_deleted ? RAM_deleted : null;
    }
}

module.exports = RAM_services;