const bcrypt = require('bcrypt');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
const Salt = process.env.SALT;

const Account = require('../models/Account');
const Role = require('../models/Role');

class AccountServices {
    static async createAccount(info) {
        //Get ID of user role
        const RoleFound = await Role.findOne({Name: 'User'}).exec();

        //Create new account
        const NewAccount = new Account({
            Email: info?.Email,
            Username: info?.Username,
            Password: await bcrypt.hash(info?.Password, Number(Salt)),
            Role: RoleFound?._id
        });
        await NewAccount.save();
        const AccountFound = await Account.findById(NewAccount?._id).populate('Role').exec();
        return AccountFound;
    }

    static async findAllAccounts() {
        const AccountsFound = await Account.find().populate('Role').exec();
        return AccountsFound;
    }

    static async findAccountByEmail(email) {
        const AccountFound = await Account.findOne({Email: email}).exec();
        return AccountFound;
    }

    static async findAccountByID(id) {
        const AccountFound = await Account.findById(id).populate('Role').exec();
        return AccountFound;
    }

    static async updateAccount(id, new_info) {
        let AccountFound = await Account.findById(id);
        if (new_info?.Email && new_info.Email !== AccountFound.Email) {
            AccountFound.Email = new_info.Email;
        }
        if (new_info?.Username && new_info.Username !== AccountFound.Username) {
            AccountFound.Username = new_info.Username;
        }
        if (new_info?.Password && new_info.Password !== AccountFound.Password) {
            AccountFound.Password = new_info.Password;
        }
        if (new_info?.Avatar && new_info.Avatar !== AccountFound.Avatar) {
            if (AccountFound.Avatar !== "/public/images/avatars/EmptyAvatar.png") {
                fs.unlinkSync('.' + AccountFound.Avatar);
                AccountFound.Avatar = '/' + new_info.Avatar.replace(/\\/g, '/');
            } else {
                AccountFound.Avatar = '/' + new_info.Avatar.replace(/\\/g, '/');
            }
        }
        if (new_info?.Role && new_info.Role !== AccountFound.Role) {
            AccountFound.Role = new mongoose.Types.ObjectId(new_info.Role);
        }
        await AccountFound.save();
        AccountFound = await Account.findById(AccountFound._id).populate('Role').exec();
        return AccountFound;
    }

    static async deleteAccount(id) {
        const AccountDeleted = await Account.findByIdAndDelete(id).exec();
        return AccountDeleted;
    }
}

module.exports = AccountServices;