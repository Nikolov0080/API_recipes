const userSchema = require('../../models/user/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('../../utils/jwt');

const matchPassword = (currPassword, userHash) => {
    return bcrypt.compare(currPassword, userHash);
}

module.exports.loginGet = (req, res) => {
    res.render('login');
}

module.exports.loginPost = (req, res) => {
    console.log(req.body)
    const {
        username,
        password
    } = req.body;

    userSchema.findOne({ username }).then((user) => {

        if (user === null) {
            res.send("wrong password");
            return;
        }

        matchPassword(password, user.password).then((resp) => {

            if (resp) {
                const token = jwt.createToken({ ...user._doc, secret: process.env.JWT_SECRET });
                res.cookie("auth", token)
                res.send("valid to login")
            } else {
                res.send("wrong password")
                // TODO authorization
            }
        })
    }).catch(e => console.log(e))
}