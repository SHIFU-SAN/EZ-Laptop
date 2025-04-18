const Adapter = require('../models/Adapter');

class AdapterServices {
    static async createAdapter(info) {
        const NewAdapter = new Adapter({
            Branch: info.Branch,
            Name: info.Name,
            OutputPower: info.OutputPower,
            OutputVoltage: info.OutputVoltage,
            OutputCurrent: info.OutputCurrent,
            Price: info.Price,
            Status: info.Status,
            Images: info.Images,
            CompatibleLaptops: info.CompatibleLaptops
        });
        await NewAdapter.save();
        return NewAdapter ? NewAdapter : null;
    }

    static async getAdapters() {
        const Result = await Adapter.find();
        return Result ? Result : null;
    }

    static async getAdapterByID(id) {
        const Result = await Adapter.findById(id);
        return Result ? Result : null;
    }

    static async updateAdapter(id, new_info) {
        let AdapterTarget = await Adapter.findById(id);

        if (new_info.Branch) {
            AdapterTarget.Branch = new_info.Branch;
        }
        if (new_info.Name) {
            AdapterTarget.Name = new_info.Name;
        }
        if (new_info.OutputPower) {
            AdapterTarget.OutputPower = new_info.OutputPower;
        }
        if (new_info.OutputVoltage) {
            AdapterTarget.OutputVoltage = new_info.OutputVoltage;
        }
        if (new_info.OutputCurrent) {
            AdapterTarget.OutputCurrent = new_info.OutputCurrent;
        }
        if (new_info.Price) {
            AdapterTarget.Price = new_info.Price;
        }
        if (new_info.Status) {
            AdapterTarget.Price = new_info.Status;
        }

        await AdapterTarget.save();
        return AdapterTarget ? AdapterTarget : null;
    }

    static async createImage(id, new_image) {
        let AdapterTarget = await Adapter.findById(id);
        const OldLength = AdapterTarget.Images.length;

        AdapterTarget.Images.push(new_image);
        await AdapterTarget.save();
        const NewLength = AdapterTarget.Images.length;

        return OldLength < NewLength ? new_image : null;
    }

    static async deleteImage(id, image_id) {
        let AdapterTarget = await Adapter.findById(id);
        const OldLength = AdapterTarget.Images.length;

        let Images = AdapterTarget.Images;
        let ImageRemoved = {}
        Images.map(image => {
            if (image._id === image_id) {
                ImageRemoved = image;
                Images.pull(image._id)
            }
        });
        await AdapterTarget.save();
        const NewLength = AdapterTarget.Images.length;

        return OldLength > NewLength ? ImageRemoved : null;
    }

    static async deleteImages(id) {
        let AdapterTarget = await Adapter.findById(id);
        const OldImages = AdapterTarget.Images;
        AdapterTarget.Images = [];
        await AdapterTarget.save();
        const NewLength = AdapterTarget.Images.length;
        return NewLength === 0 ? OldImages : null;
    }

    static async createCompatibleLaptop(id, laptop_id) {
        let AdapterTarget = await Adapter.findById(id);
        const OldLength = AdapterTarget.CompatibleLaptops.length;

        AdapterTarget.CompatibleLaptops.push(laptop_id);
        await AdapterTarget.save();
        const NewLength = AdapterTarget.CompatibleLaptops.length;

        return OldLength < NewLength ? laptop_id : null;
    }

    static async deleteCompatibleLaptop(id, laptop_id) {
        let AdapterTarget = await Adapter.findById(id);
        const OldLength = AdapterTarget.CompatibleLaptops.length;

        let CompatibleLaptops = AdapterTarget.CompatibleLaptops;
        let LaptopRemoved = {}
        CompatibleLaptops.map(laptop => {
            if (laptop.LaptopID === laptop_id) {
                LaptopRemoved = laptop;
                CompatibleLaptops.pull(laptop._id)
            }
        });
        await AdapterTarget.save();
        const NewLength = AdapterTarget.CompatibleLaptops.length;

        return OldLength > NewLength ? LaptopRemoved : null;
    }

    static async deleteCompatibleLaptops(id) {
        let AdapterTarget = await Adapter.findById(id);
        const OldCompatibleLaptops = AdapterTarget.CompatibleLaptops;
        AdapterTarget.CompatibleLaptops = [];
        await AdapterTarget.save();
        const NewLength = AdapterTarget.CompatibleLaptops.length;
        return NewLength === 0 ? OldCompatibleLaptops : null;
    }

    static async deleteAdapter(id) {
        const Result = await Adapter.findByIdAndDelete(id);
        return Result ? Result : null;
    }
}

module.exports = AdapterServices;