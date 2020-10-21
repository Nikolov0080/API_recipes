const recipeSchema = require('../../models/recipes/recipeSchema');

module.exports.getAllRecipesGet = (req, res) => {

    const allRecipes = recipeSchema.find({}, (err, data) => {
        return data;
    });

    allRecipes.then((result) => {
        const data = result;
        if (data.length === 0) {
            return res.send("No recipes in db !")
        }
        res.render('allRecipes', { data: data });
    }).catch((err) => {
        console.log(err);
    });

}

module.exports.getAllRecipesPost = (req, res) => {

}