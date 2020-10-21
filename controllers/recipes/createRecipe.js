const recipeSchema = require('../../models/recipes/recipeSchema');
const jwt = require('../../utils/jwt');
const { upload } = require('../../utils/multerConf');
const { saveRecipeImage } = require('../../utils/cloudinary/saveRecipeImage');
const { recipesValidations } = require('../../validations/recipes');

module.exports.createRecipe = (req, res, next) => {

    const creatorId = jwt.decodeToken(req.cookies['auth'])._id;

    upload.single('image')(req, res, (err) => {

        const isValid = recipesValidations(req.body)

        if (isValid) {
            return res.send(isValid)
        }

        if (!req.file) {
            return res.send('select image')
        }

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

                saveRecipe(resp).then((dbResponse) => {
                    if (dbResponse) { // if error return error query ... just to test the API for now
                        res.redirect('/recipes/create-recipe?created');
                    } else {
                        res.redirect('/recipes/create-recipe?error');
                    }
                });

            }).catch((e) => {
                console.log(e);
            });
        }
    });
}