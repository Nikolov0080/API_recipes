const recipeSchema = require('../../models/recipes/recipeSchema');

module.exports.getAllRecipesGet = (req, res) => {

    const allRecipes = recipeSchema.find({}, (err, data) => {
        return data
    })

    allRecipes.then((result) => {
        const data = result;

        res.render('allRecipes', { data:data });
    }).catch((err) => {

    });

}

module.exports.getAllRecipesPost = (req, res) => {

}