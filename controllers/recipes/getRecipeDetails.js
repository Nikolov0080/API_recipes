const recipeSchema = require('../../models/recipes/recipeSchema');
const mongoose = require('mongoose');

module.exports.getRecipeDetails = (req, res) => {

    const id = req.params.id
    const isValidId =mongoose.Types.ObjectId.isValid(id);
    
    if (isValidId) {
        recipeSchema.findById({ _id: id }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(203).send(err.message)
            }
        }).exec().then((data) => {
            return res.status(203).send(data);
        })
    }else{
        return res.status(203).send('Something is invalid');
    }

}

module.exports.postRecipeDetails = (id) => {
    //TODO POST COMMENT , LIKE , ADD TO FAVORITES
}