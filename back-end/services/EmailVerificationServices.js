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
        const EmailTarget = await EmailVerification.findOne({Email: email});
        if (!EmailTarget) return false;
        return EmailTarget.Code === code;
    }

    static async deleteCode(email) {
        const CodeDeleted = await EmailVerification.findOneAndDelete({Email: email});
        return CodeDeleted ? CodeDeleted : null;
    }
}

module.exports = EmailVerificationServices;