const recipeSchema = require('../../models/recipes/recipeSchema');

module.exports.getAllRecipesGet = (req, res) => {

    const allRecipes = recipeSchema.find({}, (err, data) => {
        return data
    })

    allRecipes.then((result) => {
        const data = result;

// TODO FINISH IMAGE UPLOAD SOMEWHERE LOL.....
        res.render('allRecipes',{data});
    }).catch((err) => {

    });

}

module.exports.getAllRecipesPost = (req, res) => {



}