const userSchema = require('../../models/user/userSchema');
const { saveProfilePicture } = require('../../utils/cloudinary/saveProfilePicture');
const jwt = require('../../utils/jwt');
const { upload } = require('../../utils/multerConf');
const { validationResult } = require('express-validator');
const { deletePicture } = require('../../utils/cloudinary/deletePicture');

module.exports.registerGet = (req, res) => {
    res.render('register')
}

module.exports.registerPost = (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    upload.single('profilePicture')(req, res, (err) => {

        const {
            username,
            email,
            password,
            skillLevel
        } = req.body;

        if (err) {
            console.log(err);
            return res.render('error', { err })
        } else {
            const profilePic = req.file;

            if (!profilePic) { // TODO FIX ERROR WITH EMPTY PROFILE PIC FIELD
                return res.send("Profile pic is required");
            } else {
                saveProfilePicture(profilePic.filename).then((resp) => {
                    return resp;
                    // TODO -- STOP THE FILE UPLOAD IF SCHEMA IS INVALID !
                }).then((profilePictureURL) => {

                    async function saveUser() {
                        return await userSchema.create({ username, email, password, skillLevel, profilePictureURL })
                    }

                    saveUser().then(async (response) => {

                        if (response) {

                            const token = jwt.createToken({ ...response._doc, secret: process.env.JWT_SECRET });
                            res.cookie("auth", token);
                        } else {
                            console.log("SOMETHING WENT WRONG");
                        }
                    }).then(() => {

                        res.redirect('/?registered!!!');
                    }).catch(e => {

                        console.log(e)

                        return res.send(e._message)
                    })

                })
            }
        }
    })
}