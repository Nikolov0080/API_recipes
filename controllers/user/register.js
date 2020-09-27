const userSchema = require('../../models/user/userSchema');
const jwt = require('../../utils/jwt');

module.exports.registerGet = (req, res) => {
    res.render('register')
}

module.exports.registerPost = (req, res) => {
    console.log(req.body);

    const {
        username,
        email,
        password
    } = req.body

    async function saveUser() {
        return await userSchema.create({ username, email, password })
    }

    saveUser().then(async (response) => {
        if (response) {
            console.log(response);

            const token = jwt.createToken({ ...response });

            res.cookie("auth", token);

        } else {
            console.log("SOMETHING WENT WRONG")
        }
    }).then(() => {

        res.redirect('/?registered!!!');
    }).catch(e => console.log(e))
}