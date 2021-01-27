const recipeSchema = require('../../models/recipes/recipeSchema');
const userSchema = require('../../models/user/userSchema');

module.exports.deleteRecipe = (req, res) => {
    const userId = req.params.id.split('&&')[0]
    const recipeId = req.params.id.split('&&')[1]

     Promise.all(
        [deleteFromRecipes(),
        deleteRecipeFromUserRecipes(),
        deleteRecipeFromUserLikes()
        ])
        .then((resp) => {
            res.send("deleted");
        })
        .catch(err => {
            console.log(err);
            return res.send('err');
        })


    async function deleteFromRecipes() {
        return await recipeSchema.deleteOne({ _id: recipeId }, (err, success) => {
            if (err) {
                console.log(err)
            }
        })
    }

    async function deleteRecipeFromUserLikes() {
        return await userSchema.updateOne({ _id: userId },
            { $pull: { likedRecipes: recipeId } }, (err, success) => {
                if (err) {
                    console.log(err)
                }
            })
    }

    async function deleteRecipeFromUserRecipes() {
        return await userSchema.updateOne({ _id: userId },
            { $pull: { userRecipes: recipeId } }, (err, success) => {
                if (err) {
                    console.log(err)
                }
            })
    }
}