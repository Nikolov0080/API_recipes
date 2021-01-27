const recipeSchema = require('../../models/recipes/recipeSchema');

module.exports.getCategory = (req, res) => {
    const category = req.body.category

    recipeSchema.find({ category: { $regex: category } })
        .populate('creatorId')
        .then((response) => {
            if (response.length === 0) {
                return res.status(204).send('no recipes in this category');
            }
            return res.send(response);
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send('something went wrong');
        })
}