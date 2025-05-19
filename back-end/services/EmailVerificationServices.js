const EmailVerification = require("../models/EmailVerification");

class EmailVerificationServices {


    static async createEmailVerification(email) {
        // Generate a random code of 6 characters in length
        const NewCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

        const NewEmailVerification = new EmailVerification({
            Email: email,
            Code: NewCode.toString()
        });

        await NewEmailVerification.save();

        return NewEmailVerification ? NewEmailVerification : null;
    }

    static async compareCode(email, code) {
        const EmailTarget = await EmailVerification.findOne({
            Email: email,
            Code: code
        });
        return !!EmailTarget;
    }

    static async deleteCodeByID(id) {
        const CodeDeleted = await EmailVerification.findByIdAndDelete(id);
        return CodeDeleted ? CodeDeleted : null;
    }

    static async deleteCodeByEmailAndCode(email, code) {
        const CodeDeleted = await EmailVerification.findOneAndDelete({
            Email: email,
            Code: code
        });
        return CodeDeleted ? CodeDeleted : null;
    }
}

module.exports = EmailVerificationServices;