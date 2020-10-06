const { body, check, validationResult } = require('express-validator');
const userSchema = require('../models/user/userSchema');

exports.login = [
    check('username').not().isEmpty().withMessage("Username required"),
    check('username').isLength({ min: 6 }).withMessage('Username must be at least 6 characters long'),

    check('password').not().isEmpty().withMessage("Password is required"),
    check('password').isLength({ min: 3 }).withMessage('Password must be at least 6 characters long'),

    check("username").custom(async (username) => {
        const user = await userSchema.findOne({ username });

        if (user) {
            return Promise.reject("Username already in use");
        }
    })
];

exports.register = [

    check('username').not().isEmpty().withMessage("Username is required"),
    check('password').not().isEmpty().withMessage("Password is required"),
    check('rePassword').not().isEmpty().withMessage("Repeat Password is required"),
    check('email').not().isEmpty().withMessage("Email is required"),
    check('skillLevel').not().isEmpty().withMessage("Skill Level is required"),
    check('profilePicture').not().isEmpty().withMessage("Profile picture is required"),

    check('username').isLength({ min: 6 }).withMessage('Username must be at least 6 characters long'),
    check('password').isLength({ min: 3 }).withMessage('Password must be at least 6 characters long'),


    check("username").custom(async (username) => {
        const user = await userSchema.findOne({ username });

        if (user) {
            return Promise.reject("Username already in use");
        }
    }),

    check("email").custom(async (email) => {
        const user = await userSchema.findOne({ email });

        if (user) {
            return Promise.reject("Username already in use");
        }
    })
]