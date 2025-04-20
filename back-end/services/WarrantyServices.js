const Warranty = require('../models/Warranty');

class WarrantyServices {
    static async createWarranty(info) {
        const NewWarranty = new Warranty({
            Products: info.Products,
            CustomerID: info.CustomerID,
            Start: info.Start,
            End: info.End,
            Status: info.Status
        });

        await NewWarranty.save();

        return NewWarranty ? NewWarranty : null;
    }

    static async readWarranties() {
        const Warranties = await Warranty.find();

        return Warranties ? Warranties : null;
    }

    static async readWarrantyByID(id) {
        const WarrantyTarget = await Warranty.findById(id);

        return WarrantyTarget ? WarrantyTarget : null;
    }

    static async updateWarranty(id, new_info) {
        let WarrantyTarget = await Warranty.findById(id);

        if (new_info.Products) {
            WarrantyTarget.Products = new_info.Products;
        }
        if (new_info.CustomerID) {
            WarrantyTarget.CustomerID = new_info.CustomerID;
        }
        if (new_info.Start) {
            WarrantyTarget.Start = new_info.Start;
        }
        if (new_info.End) {
            WarrantyTarget.End = new_info.End;
        }
        if (new_info.Status) {
            WarrantyTarget.Status = new_info.Status;
        }

        await WarrantyTarget.save();

        return WarrantyTarget ? WarrantyTarget : null;
    }

    static async createProduct(id, new_product) {
        let WarrantyTarget = await Warranty.findById(id);

        const OldLength = WarrantyTarget.Products.length;

        WarrantyTarget.Products.push(new_product);

        await WarrantyTarget.save();

        const NewLength = WarrantyTarget.Products.length;

        return OldLength < NewLength ? new_product : null;
    }

    static async deleteProduct(id, product_id) {
        let WarrantyTarget = await Warranty.findById(id);

        const OldLength = WarrantyTarget.Products.length;

        let ProductsList = WarrantyTarget.Products;
        let ProductDeleted = {};
        ProductsList.map(product => {
            if (product.LaptopID === product_id) {
                ProductDeleted = product;
                ProductsList.pull(product._id)
            } else if (product.RAM_ID === product_id) {
                ProductDeleted = product;
                ProductsList.pull(product._id)
            } else if (product.HardDriveID === product_id) {
                ProductDeleted = product;
                ProductsList.pull(product._id);
            } else if (product.AdapterID === product_id) {
                ProductDeleted = product;
            }
        });

        await WarrantyTarget.save();

        const NewLength = WarrantyTarget.Products.length;

        return OldLength > NewLength ? ProductDeleted : null;
    }

    static async deleteProducts(id) {
        let WarrantyTarget = await Warranty.findById(id);

        const OldProducts = WarrantyTarget.Products;

        WarrantyTarget.Products = [];

        await WarrantyTarget.save();

        const NewLength = WarrantyTarget.Products.length;

        return NewLength === 0 ? OldProducts : null;
    }

    static async deleteWarranty(id) {
        const WarrantyDeleted = await Warranty.findByIdAndDelete(id);

        return WarrantyDeleted ? WarrantyDeleted : null;
    }
}

module.exports = WarrantyServices;