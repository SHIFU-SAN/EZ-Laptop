const Account = require("../models/Account");

class AccountServices {
    static async createAccount(info) {
        const NewAccount = new Account({
            PhoneNumber: info.PhoneNumber,
            Email: info.Email,
            Username: info.Username,
            Password: info.Password,
            Name: info.Name
        });

        await NewAccount.save();
        return NewAccount ? NewAccout : null;
    }

    static async getAccounts() {
        const Result = await Account.find();
        return Result ? Result : null;
    }

    static async getAccountByID(id) {
        const Result = await Account.findById(id);
        return Result ? Result : null;
    }

    static async updateAccount(id, new_info) {
        let Target = await Account.findById(id);

        if (new_info.PhoneNumber) {
            Target.PhoneNumber = new_info.PhoneNumber;
        }
        if (new_info.Email) {
            Target.Email = new_info.Email;
        }
        if (new_info.Username) {
            Target.Username = new_info.Username;
        }
        if (new_info.Password) {
            Target.Password = new_info.Password;
        }
        if (new_info.Name) {
            Target.Name = new_info.Name;
        }
        if (new_info.Avatar) {
            Target.Avatar = new_info.Avatar;
        }
        if (new_info.Permission) {
            Target.Permission = new_info.Permission;
        }

        await Target.save();
        return Target ? Target : null;
    }

    static async deleteAccount(id) {
        const Result = await Account.findByIdAndDelete(id);
        return Result ? Result : null;
    }
}

module.exports = AccountServices;