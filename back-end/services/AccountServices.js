const {Account} = require("../models/Account");

async function addAccount(details) {
    let NewAccount = new Account({
        CustomerID: details.CustomerID,
        Username: details.Username,
        Password: details.Password,
        Name: details.Name,
        Avatar: details.Avatar,
        Permission: details.Permission
    });
    await NewAccount.save();
    return NewAccount;
}

async function getAllAccounts() {
    let result = await Account.find();
    return result ? result : null;
}

async function getAccountByID(id) {
    let result = await Account.findOne({CustomerID: id});
    return result ? result : null;
}

async function updateAccount(id, new_info) {
    let result = await Account.findOne({CustomerID: id});
    if (new_info.Username) {
        result.Username = new_info.Username;
    }
    if (new_info.Password) {
        result.Password = new_info.Password;
    }
    if (new_info.Name) {
        result.Name = new_info.Name;
    }
    if (new_info.Avatar) {
        result.Avatar = new_info.Avatar;
    }
    if (new_info.Permission) {
        result.Permission = new_info.Permission;
    }
    result.save();
    return result ? result : null;
}

async function deleteAccount(id) {
    let result = await Account.findOneAndDelete({CustomerID: id});
    return result ? result : null;
}

module.exports = {
    addAccount,
    getAllAccounts,
    getAccountByID,
    updateAccount,
    deleteAccount
}