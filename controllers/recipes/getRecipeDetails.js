const recipeSchema = require('../../models/recipes/recipeSchema');

module.exports.getRecipeDetails = (req, res) => {

    // const id = req.params / req.body
    const testId = "5f7b622a18e4fe41b8b7392e"
    const recipe = recipeSchema.findById(testId, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        return data;
    }).exec().then((data) => {

        res.render('recipeDetails', { data:data,prepTime:data.prepTime });
    })

}

module.exports.postRecipeDetails = (id) => {

}