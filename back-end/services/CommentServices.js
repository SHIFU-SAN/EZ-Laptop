const Comment = require('../models/Comment');

class CommentServices {
    static async createComment(info) {
        const NewComment = new Comment({
            UserID: info.UserID,
            Products: info.Products,
            Content: info.Content
        });

        await NewComment.save();

        return NewComment ? NewComment : null;
    }

    static async readComments() {
        const CommentsList = await Comment.find();

        return CommentsList ? CommentsList : null;
    }

    static async readCommentByID(id) {
        const CommentTarget = await Comment.findById(id);

        return CommentTarget ? CommentTarget : null;
    }

    static async updateComment(id, new_info) {
        const CommentTarget = await Comment.findById(id);

        if (new_info.UserID) {
            CommentTarget.UserID = new_info.UserID;
        }
        if (new_info.Products) {
            CommentTarget.Products = new_info.Products;
        }
        if (new_info.Content) {
            CommentTarget.Content = new_info.Content;
        }

        await CommentTarget.save();

        return CommentTarget ? CommentTarget : null;
    }

    static async createProduct(id, new_product) {
        const CommentTarget = await Comment.findById(id);

        const OldLength = CommentTarget.Products.length;

        CommentTarget.Products.push(new_product);

        await CommentTarget.save();

        const NewLength = CommentTarget.Products.length;

        return OldLength < NewLength ? new_product : null;
    }

    static async deleteProduct(id, product_id) {
        const CommentTarget = await Comment.findById(id);

        const OldLength = CommentTarget.Products.length;

        let ProductsList = CommentTarget.Products;
        let ProductDeleted = {};
        ProductsList.map(product => {
            if (product.LaptopOrder.LaptopID === product_id) {
                ProductDeleted = product;
                ProductsList.pull(product._id)
            } else if (product.RAM_Order.RAM_ID === product_id) {
                ProductDeleted = product;
                ProductsList.pull(product._id)
            } else if (product.HardDriveOrder.HardDriveID === product_id) {
                ProductDeleted = product;
                ProductsList.pull(product._id);
            } else if (product.AdapterOrder.AdapterID === product_id) {
                ProductDeleted = product;
                ProductsList.pull(product._id);
            }
        });

        await CommentTarget.save();

        const NewLength = CommentTarget.Products.length;

        return OldLength > NewLength ? ProductDeleted : null;
    }

    static async deleteProducts(id) {
        const CommentTarget = await Comment.findById(id);

        const OldProducts = CommentTarget.Products;

        CommentTarget.Products = [];

        await CommentTarget.save();

        const NewLength = CommentTarget.Products.length;

        return NewLength === 0 ? OldProducts : null;
    }

    static async deleteComment(id) {
        const CommentDeleted = await Comment.findByIdAndDelete(id);

        return CommentDeleted ? CommentDeleted : null;
    }
}

module.exports = CommentServices;