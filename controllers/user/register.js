const userSchema = require('../../models/user/userSchema');
const jwt = require('../../utils/jwt');
const { upload } = require('../../utils/multerConf');

module.exports.registerGet = (req, res) => {
    res.render('register')
}

module.exports.registerPost = (req, res) => {


    upload.single('profilePicture')(req, res, (err) => {

        if (err) {
            console.log(err)
            return res.render('error', { err })
        } else {
            const profilePic = req.file;

            console.log(profilePic);
        }
        res.redirect('/users/register')
    })


    // const {
    //     username,
    //     email,
    //     password
    // } = req.body

    // async function saveUser() {
    //     return await userSchema.create({ username, email, password })
    // }

    // saveUser().then(async (response) => {
    //     if (response) {

    //         const token = jwt.createToken({ ...response._doc, secret: process.env.JWT_SECRET });

    //         res.cookie("auth", token);

    //     } else {
    //         console.log("SOMETHING WENT WRONG")
    //     }
    // }).then(() => {

    //     res.redirect('/?registered!!!');
    // }).catch(e => console.log(e))
}