const RefreshToken = require('../models/RefreshToken');

class RefreshTokenServices {
    static async createRefreshToken(value) {
        const NewRefreshToken = new RefreshToken({
            Value: value
        });

        await NewRefreshToken.save();

        return NewRefreshToken ? NewRefreshToken : null;
    }

    static async readRefreshTokenByValue(value) {
        const RefreshTokenTarget = await RefreshToken.findOne({Value: value});
        return RefreshTokenTarget ? RefreshTokenTarget : null;
    }

    static async deleteRefreshTokenByValue(value) {
        const RefreshTokenDeleted = await RefreshToken.findOneAndDelete({Value: value});
        return RefreshTokenDeleted ? RefreshTokenDeleted : null;
    }
}

module.exports = RefreshTokenServices;