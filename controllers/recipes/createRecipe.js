const recipeSchema = require('../../models/recipes/recipeSchema');
const jwt = require('../../utils/jwt');


module.exports.createRecipe = (req, res, next) => {

    const {
        recipeName,
        products,
        prepTime,
        cookTime,
        directions,
        difficulty
    } = req.body;

    async function saveRecipe() {
        return await recipeSchema.create({
            recipeName,
            products,
            prepTime,
            cookTime,
            directions,
            difficulty
        })
    }

    const creatorId = jwt.decodeToken(req.cookies['auth'])._id;

    console.log(creatorId);

    res.redirect('/recipes/create-recipe');
}