const Laptop = require("../models/Laptop");

class LaptopServices {
    static async createLaptop(info) {
        const NewLaptop = new Laptop({
            Name: info?.Name,
            CPU: info?.CPU,
            GPU: info?.GPU,
            RAM: info?.RAM,
            SSD: info?.SSD,
            Screen: info?.Screen,
            Avatar: info?.Avatar,
            Price: info?.Price
        });
        await NewLaptop.save();
        return NewLaptop;
    }

    static async findAllLaptops() {
        const FoundLaptops = await Laptop.find();
        return FoundLaptops;
    }

    static async updateLaptop(id, new_info) {
        let FoundLaptop = await Laptop.findById(id);
        if (new_info?.Name && new_info?.Name !== FoundLaptop?.Name) {
            FoundLaptop.Name = new_info?.Name;
        }
        if (new_info?.CPU && new_info?.CPU !== FoundLaptop?.CPU) {
            FoundLaptop.CPU = new_info?.CPU;
        }
        if (new_info?.GPU && new_info?.GPU !== FoundLaptop?.GPU) {
            FoundLaptop.GPU = new_info?.GPU;
        }
        if (new_info?.RAM && new_info?.RAM !== FoundLaptop?.RAM) {
            FoundLaptop.RAM = new_info?.RAM;
        }
        if (new_info?.SSD && new_info?.SSD !== FoundLaptop?.SSD) {
            FoundLaptop.SSD = new_info?.SSD;
        }
        if (new_info?.Screen && new_info?.Screen === FoundLaptop?.Screen) {
            FoundLaptop.Screen = new_info?.Screen;
        }
        if (new_info?.Avatar && new_info?.Avatar !== FoundLaptop?.Avatar) {
            FoundLaptop.Avatar = new_info?.Avatar;
        }
        if (new_info?.Price && new_info?.Price !== FoundLaptop?.Price) {
            FoundLaptop.Price = new_info?.Price;
        }
        await FoundLaptop.save();
        return FoundLaptop;
    }

    static async deleteLaptop(id) {
        let deletedLaptop = await Laptop.findByIdAndDelete(id);
        return deletedLaptop;
    }
}

module.exports = LaptopServices;