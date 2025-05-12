const UnverifiedAccount = require("../models/UnverifiedAccount");

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
}

module.exports = UnverifiedAccountServices;