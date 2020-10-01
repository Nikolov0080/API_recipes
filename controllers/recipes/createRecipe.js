const recipeSchema = require('../../models/recipes/recipeSchema');
const jwt = require('../../utils/jwt');
// const cloudinary = require('cloudinary');


module.exports.createRecipe = (req, res, next) => {

    const creatorId = jwt.decodeToken(req.cookies['auth'])._id;

    const {
        recipeName,
        products,
        prepTime,
        cookTime,
        directions,
        difficulty,
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
        })
    }

    saveRecipe().then((response) => {
        console.log(response)
    })


    console.log(creatorId);
    res.redirect('/recipes/create-recipe');
}

module.exports.createRecipeImages = (req, res, next) => {

    console.log(req.body)
    res.redirect('/recipes/create-recipe/images')

}