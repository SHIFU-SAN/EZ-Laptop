const Laptop = require('../models/Laptop');

class LaptopServices {
    static async createLaptop(info) {
        const NewLaptop = new Laptop({
            Branch: info.Branch,
            Name: info.Name,
            CPU_ID: info.CPU_ID,
            GPU_ID: info.GPU_ID,
            ScreenID: info.ScreenID,
            Battery: info.Battery,
            AdapterID: info.AdapterID,
            TDP: info.TDP,
            Weight: info.Weight,
            Warranty: info.Warranty,
            Price: info.Price,
            Quantity: info.Quantity,
            Images: info.Images,
            Status: info.Status
        });

        await NewLaptop.save();

        return NewLaptop ? NewLaptop : null;
    }

    static async readLaptops() {
        const Laptops = await Laptop.find();

        return Laptops ? Laptops : null;
    }

    static async readLaptopByID(id) {
        const LaptopTarget = await Laptop.findById(id);

        return LaptopTarget ? LaptopTarget : null;
    }

    static async updateLaptop(id, new_info) {
        let LaptopTarget = await Laptop.findById(id);

        if (new_info.Branch) {
            LaptopTarget.Branch = new_info.Branch;
        }
        if (new_info.Name) {
            LaptopTarget.Name = new_info.Name;
        }
        if (new_info.CPU_ID) {
            LaptopTarget.CPU_ID = new_info.CPU_ID;
        }
        if (new_info.GPU_ID) {
            LaptopTarget.GPU_ID = new_info.GPU_ID;
        }
        if (new_info.ScreenID) {
            LaptopTarget.ScreenID = new_info.ScreenID;
        }
        if (new_info.Battery) {
            LaptopTarget.Battery = new_info.Battery;
        }
        if (new_info.AdapterID) {
            LaptopTarget.AdapterID = new_info.AdapterID;
        }
        if (new_info.TDP) {
            LaptopTarget.TDP = new_info.TDP;
        }
        if (new_info.Weight) {
            LaptopTarget.Weight = new_info.Weight;
        }
        if (new_info.Warranty) {
            LaptopTarget.Warranty = new_info.Warranty;
        }
        if (new_info.Price) {
            LaptopTarget.Price = new_info.Price;
        }
        if (new_info.Quantity) {
            LaptopTarget.Quantity = new_info.Quantity;
        }
        if (new_info.Images) {
            LaptopTarget.Images = new_info.Images;
        }
        if (new_info.Status) {
            LaptopTarget.Status = new_info.Status;
        }

        await LaptopTarget.save();

        return LaptopTarget ? LaptopTarget : null;
    }

    static async createImage(id, new_image) {
        let LaptopTarget = await Laptop.findById(id);

        const OldLength = LaptopTarget.Images.length;

        LaptopTarget.Images.push(new_image);

        await LaptopTarget.save();

        const NewLength = LaptopTarget.Images.length;

        return OldLength < NewLength ? new_image : null;
    }

    static async deleteImage(id, image_id) {
        let LaptopTarget = await Laptop.findById(id);

        const OldLength = LaptopTarget.Images.length;

        let ImageDeleted = {}
        LaptopTarget.Images.map(image => {
            if (image._id === image_id) {
                ImageDeleted = image;
                LaptopTarget.Images.pull(image._id)
            }
        })

        await LaptopTarget.save();

        const NewLength = LaptopTarget.Images.length;

        return OldLength > NewLength ? ImageDeleted : null;
    }

    static async deleteImages(id) {
        let LaptopTarget = Laptop.findById(id);

        const OldImages = LaptopTarget.Images;

        LaptopTarget.Images = [];

        await LaptopTarget.save();

        const NewLength = LaptopTarget.Images.length;

        return NewLength === 0 ? OldImages : null;
    }

    static async deleteLaptop(id) {
        const LaptopDeleted = await Laptop.findByIdAndDelete(id);

        return LaptopDeleted ? LaptopDeleted : null;
    }
}

module.exports = LaptopServices;