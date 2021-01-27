const recipeSchema = require('../../../../models/recipes/recipeSchema');
const userSchema = require('../../../../models/user/userSchema');
const { checkForLikes } = require('./checkForLikes');

module.exports.like = (req, res) => {

  const userId = req.body.user_id
  const recipeId = req.body.recipe_id

  checkForLikes(recipeId,userId).then(resp => {

    if (!resp.liked) { // save like in Recipe and User objects
      Promise.all([addToRecipe(), addToUser()])
        .then(result => { console.log("Recipe liked!");
        return res.send('liked');
      })
        .catch(err => { console.log(err); })

    } else { // unlike 
      Promise.all([unlikeUser(), unlikeRecipe()])
        .then(result => { console.log("Recipe unliked!");
        return res.send('unliked');
      })
        .catch(err => { console.log(err); })
    }

  }).catch(err => { res.send("something went wrong...") })

  function unlikeUser() {
    userSchema.updateOne({ _id: userId },
      { $pull: { likedRecipes: recipeId } }, (err, success) => {
        if (err) {
          console.log(err)
        }
      })
  }

  function unlikeRecipe() {
    recipeSchema.updateOne({ _id: recipeId },
      { $pull: { likes: userId } }, (err, success) => {
        if (err) {
          console.log(err)
        }
      })
  }

  async function addToRecipe() {
    return await recipeSchema.findOneAndUpdate({
      _id: req.body.recipe_id
    },
      { $push: { likes: userId } },
      (err, success) => {
        if (err) {
          console.log(err)
        }
      }
    )
  }

  async function addToUser() {
    return await userSchema.findOneAndUpdate({
      _id: req.body.user_id
    },
      { $push: { likedRecipes: recipeId } },
      (err, success) => {
        if (err) {
          console.log(err)
        }
      })
  }

  // res.send();
}