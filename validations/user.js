const validator = require('validator').default;

exports.loginValidation = ({ username, password }) => {
    // validations just for the length TODO - more validations

    if (validator.isEmpty(username, { ignore_whitespace: false })) {
        return 'username - Empty???'
    }
    if (!validator.isLength(username, { min: 6, max: 20 })) {
        return 'username - invalid length'
    }

    if (!validator.isLength(password, { min: 6, max: 20 })) {
        return 'password - invalid length'
    }

    return false;
}

exports.registerValidator = ({ username, password, rePassword, email, skillLevel }) => {

    if (validator.isEmpty(username, { ignore_whitespace: false })) {
        return 'username - Empty???'
    }

    if (!validator.isLength(username, { min: 6, max: 20 })) {
        return 'username - invalid length';
    }

    if (!validator.isLength(password, { min: 6, max: 20 })) {
        return 'password - invalid length';
    }

    if (!validator.matches(password, rePassword)) {
        return 'password and Repeat password must match';
    }

    if (!validator.isEmail(email)) {
        return "email must be an Email => example@prov.com"
    }

    if (!validator.isNumeric(skillLevel), !(skillLevel >= 1 && 10 >= skillLevel)) {
        return "Skill level must be number 1 to 10"
    }

    return false;
}