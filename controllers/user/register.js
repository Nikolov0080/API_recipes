const userSchema = require('../../models/user/userSchema');
const { saveProfilePicture } = require('../../utils/cloudinary/saveProfilePicture');
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

            if (!profilePic) { // TODO FIX ERROR WITH EMPTY PROFILE PIC FIELD
                return res.send("Profile pic is required");
            }

            saveProfilePicture(profilePic.filename).then((profilePictureURL) => {
                console.log(profilePictureURL)
                // TODO -- STOP THE FILE UPLOAD IF SCHEMA IS INVALID !
                const {
                    username,
                    email,
                    password,
                    skillLevel
                } = req.body

                async function saveUser() {
                    return await userSchema.create({ username, email, password, skillLevel, profilePictureURL })
                }

                saveUser().then(async (response) => {
                    if (response) {

                        const token = jwt.createToken({ ...response._doc, secret: process.env.JWT_SECRET });

                        res.cookie("auth", token);

                    } else {
                        console.log("SOMETHING WENT WRONG")
                    }
                }).then(() => {

                    res.redirect('/?registered!!!');
                }).catch(e => {

                    console.log(e)
                    return res.redirect('/error')
                })
            })
        }
    })
}