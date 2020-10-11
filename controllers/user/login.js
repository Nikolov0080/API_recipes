const userSchema = require('../../models/user/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('../../utils/jwt');
const { loginValidation } = require('../../validations/user');

const matchPassword = (currPassword, userHash) => {
    return bcrypt.compare(currPassword, userHash);
}

module.exports.loginGet = (req, res) => { // renders the login page for tests
    res.render('login');
}

module.exports.loginPost = (req, res) => {

   const isValid = loginValidation(req.body)

    if (isValid) {
      return  res.send(isValid)
    }

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
                res.send("logged in !")
            } else {
                res.send("wrong password");
            }
        })
    }).catch(e => console.log(e))
}