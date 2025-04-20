const Present = require('../models/Present');

class PresentServices {
    static async createPresent(info) {
        const NewPresent = new Present({
            LaptopID: info.LaptopID,
            Products: info.Products,
            Start: info.Start,
            End: info.End,
            Status: info.Status
        });

        await NewPresent.save();

        return NewPresent ? NewPresent : null;
    }

    static async readPresents() {
        const Presents = await Present.find();

        return Presents ? Presents : null;
    }

    static async readPresentByID(id) {
        const PresentTarget = await Present.findById(id);

        return PresentTarget ? PresentTarget : null;
    }

    static async updatePresent(id, new_info) {
        let PresentTarget = await Present.findById(id);

        if (new_info.LaptopID) {
            PresentTarget.LaptopID = new_info.LaptopID;
        }
        if (new_info.Products) {
            PresentTarget.Products = new_info.Products;
        }
        if (new_info.Start) {
            PresentTarget.Start = new_info.Start;
        }
        if (new_info.End) {
            PresentTarget.End = new_info.End;
        }
        if (new_info.Status) {
            PresentTarget.Status = new_info.Status;
        }

        await PresentTarget.save();

        return PresentTarget ? PresentTarget : null;
    }

    static async createProduct(id, new_product) {
        let PresentTarget = await Present.findById(id);

        const OldLength = PresentTarget.Products.length;

        PresentTarget.Products.push(new_product);

        await PresentTarget.save();

        const NewLength = PresentTarget.Products.length;

        return OldLength < NewLength ? new_product : null;
    }

    static async deleteProduct(id, product_id) {
        let PresentTarget = await Present.findById(id);

        const OldLength = PresentTarget.Products.length;

        let ProductsList = PresentTarget.Products;
        let ProductDeleted = {};
        ProductsList.map(product => {
            if (product._id === product_id) {
                ProductDeleted = product;
                ProductsList.pull(product._id)
            }
        });

        await PresentTarget.save();

        const NewLength = PresentTarget.Products.length;

        return OldLength > NewLength ? ProductDeleted : null;
    }

    static async deleteProducts(id) {
        let PresentTarget = await Present.findById(id);

        const OldProducts = PresentTarget.Products;

        PresentTarget.Products = [];

        await PresentTarget.save();

        const NewLength = PresentTarget.Products.length;

        return NewLength === 0 ? OldProducts : null;
    }

    static async deletePresent(id) {
        const PresentDeleted = await Present.findByIdAndDelete(id);

        return PresentDeleted ? PresentDeleted : null;
    }
}

module.exports = PresentServices;