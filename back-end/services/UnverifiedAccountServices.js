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

    static async checkIfUnverifiedAccountExist(email, password) {
        const AccountFound = await UnverifiedAccount.findOne({Email: email, Password: password});
        return AccountFound ? AccountFound : null;
    }

    static async convertToVerifiedAccount(email) {
        const UnverifiedAccountTarget = await UnverifiedAccount.findOne({Email: email});
        const NewVerifiedAccount = await AccountServices.createAccount(UnverifiedAccountTarget);
        return NewVerifiedAccount ? NewVerifiedAccount : null;
    }

    static async deleteUnverifiedAccountsByEmail(email) {
        const NumberOfAccountsDeleted = await UnverifiedAccount.deleteMany({Email: email});
        return NumberOfAccountsDeleted;
    }
}

module.exports = UnverifiedAccountServices;