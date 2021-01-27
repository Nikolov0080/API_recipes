const userSchema = require('../../models/user/userSchema'); // Its a Model tho...

/*
with few words user recipes management
--- depending on the "type" ---
[liked favorites his own recipes]
*/

// uses the ID to add it to 

// user recipes array

// favorites array

// liked recipes

exports.updateUserRecipes = (userId, type, recipeId) => {
    // type can be [favorites ||  likedRecipes || userRecipes]
    userSchema.findByIdAndUpdate(userId,
        { $push: { [type]: recipeId } },
        { safe: true, upsert: true },
        function (err, data) {
            if (err) { console.log(err); return }
            console.log(data);
        }
    );
}