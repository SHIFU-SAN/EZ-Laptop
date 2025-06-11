const bcrypt = require('bcrypt');
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

    static async findAccountByEmail(email) {
        const AccountFound = await Account.findOne({Email: email});
        return AccountFound;
    }
}

module.exports = AccountServices;