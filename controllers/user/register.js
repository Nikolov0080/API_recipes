const userSchema = require('../../models/user/userSchema');
const { saveProfilePicture } = require('../../utils/cloudinary/saveProfilePicture');
const jwt = require('../../utils/jwt');
const { upload } = require('../../utils/multerConf');
const { registerValidator } = require('../../validations/user');
const { isUnique } = require('./isUnique');

module.exports.registerGet = (req, res) => {
    res.render('register');
}

module.exports.registerPost = (req, res) => {

    upload.single('profilePicture')(req, res, async (err) => {
        const isValid = registerValidator(req.body);

        if (isValid) {
            return res.send(isValid);
        }

        const {
            username,
            email,
            password,
            skillLevel
        } = req.body;

        const isUniqueUsername = isUnique(username, 'username').then(result => {
            if (result) {
                return false
                // return res.status(200).send('Username already in use!');
            }

            return true;
        }).catch(e => {
            console.log(e)
        });

        const isUniqueEmail = isUnique(email, 'email').then(result => {
            if (result) {
                return false
                // return res.status(200).send('Email already in use!');
            }

            return true;
        }).catch(e => {
            console.log(e)
        })

        // Checking if email or username Unique 
        Promise.all([isUniqueUsername, isUniqueEmail]).then(([a, b]) => {
            // console.log(a, b)

            if (!a) {
              return  res.status(200).send("Username already in use!")
            }

            if (!b) {
              return  res.status(200).send("Email already in use!")
            }

            allValid();
        })

        if (err) {
            console.log(err);
            return res.send({ err })
        } else {
            const profilePic = req.file;
            function allValid() {
                if (!profilePic) {
                    async function saveUser() {
                        return await userSchema.create({ username, email, password, skillLevel, profilePictureURL: 'no image' }).catch((err) => {
                            console.log(err.code);
                            console.log("something went wrong with registration...");
                        })
                    }

                    saveUser().then((response) => {

                        if (response) {

                            const token = jwt.createToken({ ...response._doc, secret: process.env.JWT_SECRET });
                            // res.cookie("auth", token, { httpOnly: false })
                            res.header('auth', token);

                        } else {
                            console.log("SOMETHING WENT WRONG");
                        }
                    }).then(() => {
                        return res.status(201).send('registered!');
                    }).catch(e => {

                        console.log(e)
                        return res.send(e._message)
                    })
                } else {
                    saveProfilePicture(profilePic.filename).then((resp) => {
                        return resp;

                    }).then((profilePictureURL) => {

                        async function saveUser() {
                            return await userSchema.create({ username, email, password, skillLevel, profilePictureURL }).catch((err) => {
                                console.log(err.code);
                                console.log("something went wrong with registration...");
                              
                            })
                        }

                        saveUser().then((response) => {

                            if (response) {

                                const token = jwt.createToken({ ...response._doc, secret: process.env.JWT_SECRET });
                                res.cookie("auth", token, { httpOnly: false })
                                return res.header('auth', token);

                            } else {
                                console.log("SOMETHING WENT WRONG");
                            }
                        }).then(() => {
                            return res.status(201).send('registered!');
                        }).catch(e => {

                            console.log(e)
                            return res.send(e._message);
                        })
                    })
                }
            }
        }
    })
}