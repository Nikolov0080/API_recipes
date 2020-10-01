const recipeSchema = require('../../models/recipes/recipeSchema');
const jwt = require('../../utils/jwt');
const { upload } = require('../../utils/multerConf');

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
        
            async function saveRecipe() {
                return await recipeSchema.create({
                    recipeName,
                    products,
                    prepTime,
                    cookTime,
                    directions,
                    difficulty,
                    creatorId,
                    category,
                    image
                })
            }

            saveRecipe().then((response) => {
                console.log(response)
            })
        }
    });

    res.redirect('/recipes/create-recipe');
}