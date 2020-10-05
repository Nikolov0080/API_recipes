const recipeSchema = require('../../models/recipes/recipeSchema');
const jwt = require('../../utils/jwt');
const { upload } = require('../../utils/multerConf');
const fs = require('fs');
const { saveRecipeImage } = require('../../utils/saveRecipeImage');

module.exports.createRecipe = (req, res, next) => {

    const creatorId = jwt.decodeToken(req.cookies['auth'])._id;

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
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

            async function saveRecipe(imageURL) {
                return await recipeSchema.create({
                    recipeName,
                    products,
                    prepTime,
                    cookTime,
                    directions,
                    difficulty,
                    creatorId,
                    category,
                    image: imageURL
                });
            }

            saveRecipeImage(image.filename).then(resp => {
                // resp === imageURL from the cloudinary response...
                console.log(resp);

                saveRecipe(resp).then((dbResponse)=>{
                    if(dbResponse){ // if error return error query ... just to test the API for now
                        res.redirect('/recipes/create-recipe?created');
                    }else{
                        res.redirect('/recipes/create-recipe?error');
                    }
                });

            }).catch((e) => {
                console.log(e);
            });

        }
    });

}