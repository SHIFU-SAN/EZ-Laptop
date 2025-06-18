const multer = require('multer');

const AccountServices = require("../services/AccountServices");
const LaptopServices = require("../services/LaptopServices");

const AvatarStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./public/images/avatars"),
    filename: async (req, file, cb) => {
        const AccountFound = await AccountServices.findAccountByID(req?.user_id);
        const OriginalName = file.originalname;
        const FileType = OriginalName.slice(OriginalName.lastIndexOf('.') + 1);
        const FileName = `${AccountFound.Username}_avatar.${FileType}`;
        cb(null, FileName);
    }
});

const LaptopStorage = multer.diskStorage({
    destination: (req, res, cb) => cb(null, "./public/images/laptops"),
    filename: async (req, file, cb) => {
        const LaptopFound = await LaptopServices.findLaptopByID(req.body?.LaptopID);
        const OriginalName = file.originalname;
        const FileType = OriginalName.slice(OriginalName.lastIndexOf('.') + 1);
        const FileName = `${LaptopFound.Name}.${FileType}`;
        cb(null, FileName);
    }
});

class UploadController {
    static uploadAvatar = multer({storage: AvatarStorage});
    static uploadLaptop = multer({storage: LaptopStorage});
}

module.exports = UploadController;