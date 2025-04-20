const CommentsNotification = require('../models/CommentsNotification');

class CommentsNotificationServices {
    static async createNotification(info) {
        const NewNotification = new CommentsNotification({
            Products: info.Products,
            NumberOfNewComments: info.NumberOfNewComments
        });

        await NewNotification.save();

        return NewNotification ? NewNotification : null;
    }

    static async readNotifications() {
        const Notifications = await CommentsNotification.find();

        return Notifications ? Notifications : null;
    }

    static async readNotificationByID(id) {
        const NotificationTarget = await CommentsNotification.findById(id);

        return NotificationTarget ? NotificationTarget : null;
    }

    static async updateNotification(id, new_info) {
        const NotificationTarget = await CommentsNotification.findById(id);

        if (new_info.Products) {
            NotificationTarget.Products = new_info.Products;
        }
        if (new_info.NumberOfNewComments) {
            NotificationTarget.NumberOfNewComments = new_info.NumberOfNewComments;
        }

        await NotificationTarget.save();

        return NotificationTarget ? NotificationTarget : null;
    }

    static async createProduct(id, new_product) {
        let NotificationTarget = await CommentsNotification.findById(id);

        const OldLength = NotificationTarget.Products.length;

        NotificationTarget.Products.push(new_product);

        await NotificationTarget.save();

        const NewLength = NotificationTarget.Products.length;

        return OldLength < NewLength ? new_product : null;
    }

    static async deleteProduct(id, product_id) {
        let NotificationTarget = await CommentsNotification.findById(id);

        const OldLength = NotificationTarget.Products.length;

        let ProductsList = NotificationTarget.Products;
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

        await NotificationTarget.save();

        const NewLength = NotificationTarget.Products.length;

        return OldLength > NewLength ? ProductDeleted : null;
    }

    static async deleteProducts(id) {
        let NotificationTarget = await CommentsNotification.findById(id);

        const OldProducts = NotificationTarget.Products;

        NotificationTarget.Products = [];

        await NotificationTarget.save();

        const NewLength = NotificationTarget.Products.length;

        return NewLength === 0 ? OldProducts : null;
    }

    static async deleteNotification(id) {
        const NotificationDeleted = await CommentsNotification.findByIdAndDelete(id);

        return NotificationDeleted ? NotificationDeleted : null;
    }
}

module.exports = CommentsNotificationServices;