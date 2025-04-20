const WarrantyCard = require('../models/WarrantyCard');

class WarrantyCardServices {
    static async createWarrantyCard(info) {
        const NewWarrantyCard = new WarrantyCard({
            Products: info.Products,
            Errors: info.Errors,
            AppointmentDate: info.AppointmentDate
        });

        await NewWarrantyCard.save();

        return NewWarrantyCard ? NewWarrantyCard : null;
    }

    static async readWarrantyCards() {
        const WarrantyCards = await WarrantyCard.find();

        return WarrantyCards ? WarrantyCards : null;
    }

    static async readWarrantyCardByID(id) {
        const WarrantyCardTarget = await WarrantyCard.findById(id);

        return WarrantyCardTarget ? WarrantyCardTarget : null;
    }

    static async updateWarrantyCard(id, new_info) {
        let WarrantyCardTarget = await WarrantyCard.findById(id);

        if (new_info.Products) {
            WarrantyCardTarget.Products = new_info.Products;
        }
        if (new_info.Errors) {
            WarrantyCardTarget.Errors = new_info.Errors;
        }
        if (new_info.AppointmentDate) {
            WarrantyCardTarget.AppointmentDate = new_info.AppointmentDate;
        }

        await WarrantyCardTarget.save();

        return WarrantyCardTarget ? WarrantyCardTarget : null;
    }

    static async createProduct(id, new_product) {
        let WarrantyCardTarget = await WarrantyCard.findById(id);

        const OldLength = WarrantyCardTarget.Products.length;

        WarrantyCardTarget.Products.push(new_product);

        await WarrantyCardTarget.save();

        const NewLength = WarrantyCardTarget.Products.length;

        return OldLength < NewLength ? new_product : null;
    }

    static async deleteProduct(id, product_id) {
        let WarrantyCardTarget = await WarrantyCard.findById(id);

        const OldLength = WarrantyCardTarget.Products.length;

        let ProductsList = WarrantyCardTarget.Products;
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

        await WarrantyCardTarget.save();

        const NewLength = WarrantyCardTarget.Products.length;

        return OldLength > NewLength ? ProductDeleted : null;
    }

    static async deleteProducts(id) {
        let WarrantyCardTarget = await WarrantyCard.findById(id);

        const OldProducts = WarrantyCardTarget.Products;

        WarrantyCardTarget.Products = [];

        await WarrantyCardTarget.save();

        const NewLength = WarrantyCardTarget.Products.length;

        return NewLength === 0 ? OldProducts : null;
    }

    static async createError(id, new_error) {
        let WarrantyCardTarget = await WarrantyCard.findById(id);

        const OldLength = WarrantyCardTarget.Errors.length;

        WarrantyCardTarget.Errors.push(new_error);

        await WarrantyCardTarget.save();

        const NewLength = WarrantyCardTarget.Errors.length;

        return OldLength < NewLength ? new_error : null;
    }

    static async deleteError(id, error_id) {
        let WarrantyCardTarget = await WarrantyCard.findById(id);

        const OldLength = WarrantyCardTarget.Errors.length;

        let ErrorsList = WarrantyCardTarget.Errors;
        let ErrorDeleted = {};
        ErrorsList.map(error => {
            if (error._id === error_id) {
                ErrorDeleted = error;
                ErrorsList.pull(error._id)
            }
        });

        await WarrantyCardTarget.save();

        const NewLength = WarrantyCardTarget.Errors.length;

        return OldLength > NewLength ? ErrorDeleted : null;
    }

    static async deleteErrors(id) {
        let WarrantyCardTarget = await WarrantyCard.findById(id);

        const OldErrors = WarrantyCardTarget.Errors;

        WarrantyCardTarget.Errors = [];

        await WarrantyCardTarget.save();

        const NewLength = WarrantyCardTarget.Errors.length;

        return NewLength === 0 ? OldErrors : null;
    }

    static async deleteWarrantyCard(id) {
        const WarrantyCardDeleted = await WarrantyCard.findByIdAndDelete(id);

        return WarrantyCardDeleted ? WarrantyCardDeleted : null;
    }
}

module.exports = WarrantyCardServices;