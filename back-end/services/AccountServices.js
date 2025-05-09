const Account = require("../models/Account");

class AccountServices {
    static async createAccount(info) {
        const NewAccount = new Account({
            PhoneNumber: info.PhoneNumber,
            Email: info.Email,
            Username: info.Username,
            Password: info.Password,
            Name: info.Name,
            Avatar: info.Avatar,
            Permission: info.Permission
        });

        await NewAccount.save();
        return NewAccount ? NewAccout : null;
    }

    static async readAccounts() {
        const Accounts = await Account.find();
        return Accounts ? Accounts : null;
    }

    static async readAccountByID(id) {
        const AccountTarget = await Account.findById(id);
        return AccountTarget ? AccountTarget : null;
    }

    static async updateAccount(id, new_info) {
        let AccountTarget = await Account.findById(id);

        if (new_info.PhoneNumber) {
            AccountTarget.PhoneNumber = new_info.PhoneNumber;
        }
        if (new_info.Email) {
            AccountTarget.Email = new_info.Email;
        }
        if (new_info.Username) {
            AccountTarget.Username = new_info.Username;
        }
        if (new_info.Password) {
            AccountTarget.Password = new_info.Password;
        }
        if (new_info.Name) {
            AccountTarget.Name = new_info.Name;
        }
        if (new_info.Avatar) {
            AccountTarget.Avatar = new_info.Avatar;
        }
        if (new_info.Permission) {
            AccountTarget.Permission = new_info.Permission;
        }

        await AccountTarget.save();
        return AccountTarget ? AccountTarget : null;
    }

    static async deleteAccount(id) {
        const AccountDeleted = await Account.findByIdAndDelete(id);
        return AccountDeleted ? AccountDeleted : null;
    }
}

module.exports = AccountServices;