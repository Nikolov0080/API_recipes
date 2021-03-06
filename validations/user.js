const userSchema = require('../models/user/userSchema');
const mongoose = require('mongoose');
const validator = require('validator').default;

exports.loginValidation = ({ username, password }) => {
   
    if (validator.isEmpty(username) || username === undefined) {
        return 'username - Empty???';
    }

    if (validator.isEmpty(password) || password === undefined) {
        return 'password - Empty???';
    }

    if (!validator.isLength(username, { min: 6, max: 20 })) {
        return 'username - invalid length [6 to 20]';
    }

    if (!validator.isLength(password, { min: 6, max: 20 })) {
        return 'password - invalid length [6 to 20]';
    }
    return false;
}

exports.registerValidator = ({ username, password, rePassword, email, skillLevel }) => {

    if (validator.isEmpty(username)) {
        return 'username - Empty???';
    }

    if (validator.isEmpty(password)) {
        return 'password - Empty???';
    }

    if (validator.isEmpty(email)) {
        return 'email - Empty???';
    }

    if (validator.isEmpty(skillLevel)) {
        return 'Skill level - Empty???';
    }

    if (!validator.isLength(username, { min: 6, max: 20 })) {
        return 'username - invalid length';
    }

    if (!validator.isLength(password, { min: 6, max: 20 })) {
        return 'password - invalid length';
    }

    if (!validator.equals(password, rePassword)) {
        return 'password and Repeat password must match';
    }
 
    if (!validator.isEmail(email)) {
        return "email must be an Email => example@prov.com";
    }

    if (!validator.isNumeric(skillLevel), !(skillLevel >= 1 && 10 >= skillLevel)) {
        return "Skill level must be number 1 to 10";
    }

    return false;
}