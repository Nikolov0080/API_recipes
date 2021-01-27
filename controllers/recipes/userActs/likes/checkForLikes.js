const userSchema = require('../../../../models/user/userSchema');
const { decodeToken } = require('../../../../utils/jwt');

exports.checkForLikes = (recipeId, userId) => {
   
    return userSchema.findOne({ _id: userId }).then(({likedRecipes}) => {

        const isLiked = likedRecipes.includes(recipeId);
    
        if (isLiked) {
            return {
                liked: true
            }
        } else {
            return {
                liked: false
            }
        }
    })
}