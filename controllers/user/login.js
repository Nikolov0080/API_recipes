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

    if (Object.keys(req.body).length === 0) {
        return res.send("Enter username and password");
    }

    const isValid = loginValidation(req.body)

    if (isValid) {
        return res.send(isValid)
    }

    const {
        username,
        password
    } = req.body;
    userSchema.findOne({ username }).then((user) => {

        if (user === null) {
            res.send("wrong password or username");
            return;
        }

        matchPassword(password, user.password).then((resp) => {
           
            const userData = {
                _id: user._id,
                email: user.email,
                profilePictureURL: user.profilePictureURL,
                username:user.username
            }

            if (resp) {
                const token = jwt.createToken({ ...userData, secret: process.env.JWT_SECRET });
                res.cookie("auth", token, { expires: new Date(Date.now() + 9999999), httpOnly: false })
                res.header('auth', token)
                res.send("logged in !")
            } else {
                res.send("wrong password or username");
            }
        })

    }).catch(e => console.log(e))
}