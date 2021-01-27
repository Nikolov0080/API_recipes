const UserSchema = require('../../models/user/userSchema');

exports.isUnique = async (username, type) => {
    const isUnique = await UserSchema.findOne({ [type]: username })
    // false if unique
    return !!isUnique;
}

