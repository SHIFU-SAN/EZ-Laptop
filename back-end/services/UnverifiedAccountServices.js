const UnverifiedAccount = require("../models/UnverifiedAccount");
const AccountServices = require("./AccountServices");

class UnverifiedAccountServices {
    static async createUnverifiedAccount(info) {
        const NewUnverifiedAccount = new UnverifiedAccount({
            Email: info.Email,
            PhoneNumber: info.PhoneNumber,
            Username: info.Username,
            Password: info.Password,
            Name: info.Name,
            Avatar: info.Avatar,
            Permission: info.Permission
        });

        await NewUnverifiedAccount.save();
        return NewUnverifiedAccount ? NewUnverifiedAccount : null;
    }

    static async saveUnverifiedAccount(email) {
        const UnverifiedAccountTarget = await UnverifiedAccount.findOne({Email: email});
        return AccountServices.createAccount(UnverifiedAccountTarget);
    }

    static async deleteUnverifiedAccount(email) {
        const UnverifiedAccountDeleted = await UnverifiedAccount.findOneAndDelete({Email: email});
        return UnverifiedAccountDeleted ? UnverifiedAccountDeleted : null;
    }
}

module.exports = UnverifiedAccountServices;