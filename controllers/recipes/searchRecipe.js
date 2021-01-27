const recipeSchema = require('../../models/recipes/recipeSchema');

module.exports.searchRecipe = (req, res) => {
    const recipeName = req.body.recipeName;
    recipeSchema.find({ recipeName: { $regex: recipeName } })
        .then((response) => {

            if (response.length === 0) {
                return res.status(204).send('empty')
            } else {
                return res.send(response);
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send('error')
        })
}