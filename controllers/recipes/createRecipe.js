const recipeSchema = require('../../models/recipes/recipeSchema');
const jwt = require('../../utils/jwt');
const { upload } = require('../../utils/multerConf');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

module.exports.createRecipe = (req, res, next) => {

    const creatorId = jwt.decodeToken(req.cookies['auth'])._id;

    upload(req, res, (err) => {
        if (err) {
            res.render('error', { err })
        } else {
            const image = req.file;

            const {
                recipeName,
                products,
                prepTime,
                cookTime,
                directions,
                difficulty,
                category
            } = req.body;
            console.log();
// TODO --- TAKE IN NEW FILE SAVE IMAGE FUNCTION
            cloudinary.uploader.upload(process.cwd() + "/uploads/" + image.filename,

                {
                    resource_type: "image", public_id: "recipes/images/" + image.filename,
                    overwrite: true
                }, (err) => {
                    if (err) {
                        console.log(err)
                    }
                }).then((da) => {
                    console.log(da)
                });

// TODO --- TAKE IN NEW FILE SAVE IMAGE FUNCTION
// SET DELETE IMAGE FROM CURRENT SERVER STORAGE 
// SET IMAGE IN RECIPE DATA TO IMAGE--URL

            // fs.unlink(process.cwd() + "/uploads/" + image.filename, (err) => {
            //     if (err) {
            //         console.log(err)
            //     }
            //     console.log("deleted")
            // })

           

            // async function saveRecipe() {
            //     return await recipeSchema.create({
            //         recipeName,
            //         products,
            //         prepTime,
            //         cookTime,
            //         directions,
            //         difficulty,
            //         creatorId,
            //         category,
            //         image
            //     })
            // }

            // saveRecipe().then((response) => {
            //     console.log(response)
            // })
        }
    });

    res.redirect('/recipes/create-recipe');
}