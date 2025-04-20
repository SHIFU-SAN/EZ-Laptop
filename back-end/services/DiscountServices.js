const Discount = require('../models/Discount');

class DiscountServices {
    static async createDiscount(info) {
        const NewDiscount = new Discount({
            Products: {
                LaptopID: info.Products.LaptopID,
                RAM_ID: info.Products.RAM_ID,
                HardDriveID: info.Products.HardDriveID,
                AdapterID: info.Products.AdapterID
            },
            Start: info.Start,
            End: info.End,
            Percentage: info.Percentage,
            Event: info.Event,
            Status: info.Status
        });

        await NewDiscount.save();

        return NewDiscount ? NewDiscount : null;
    }

    static async readDiscounts() {
        const Discounts = await Discount.find();

        return Discounts ? Discounts : null;
    }

    static async readDiscountById(id) {
        const Discount = await Discount.findById(id);

        return Discount ? Discount : null;
    }

    static async updateDiscount(id, new_info) {
        let DiscountTarget = await Discount.findById(id);

        if (new_info.Products) {
            DiscountTarget.Products = new_info.Products;
        }
        if (new_info.Start) {
            DiscountTarget.Start = new_info.Start;
        }
        if (new_info.End) {
            DiscountTarget.End = new_info.End;
        }
        if (new_info.Percentage) {
            DiscountTarget.Percentage = new_info.Percentage;
        }
        if (new_info.Event) {
            DiscountTarget.Event = new_info.Event;
        }
        if (new_info.Status) {
            DiscountTarget.Status = new_info.Status;
        }

        await DiscountTarget.save();

        return DiscountTarget ? DiscountTarget : null;
    }

    static async createProduct(id, new_product) {
        let DiscountTarget = await Discount.findById(id);

        const OldLength = DiscountTarget.Products.length;

        DiscountTarget.Products.push(new_product);

        await DiscountTarget.save();

        const NewLength = DiscountTarget.Products.length;

        return OldLength < NewLength ? new_product : null;
    }

    static async deleteProduct(id, product_id) {
        let DiscountTarget = await Discount.findById(id);

        const OldLength = DiscountTarget.Products.length;

        let ProductsList = DiscountTarget.Products;
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
                ProductsList.pull(product._id);
            }
        });

        await DiscountTarget.save();

        const NewLength = DiscountTarget.Products.length;

        return OldLength > NewLength ? ProductDeleted : null;
    }

    static async deleteProducts(id) {
        let DiscountTarget = await Discount.findById(id);

        const OldProducts = DiscountTarget.Products;

        DiscountTarget.Products = [];

        await DiscountTarget.save();

        const NewLength = DiscountTarget.Products.length;

        return NewLength === 0 ? OldProducts : null;
    }

    static async deleteDiscount(id) {
        const DiscountDeleted = await Discount.findByIdAndDelete(id);

        return DiscountDeleted ? DiscountDeleted : null;
    }
}

module.exports = DiscountServices;