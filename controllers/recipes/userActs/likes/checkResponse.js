const userSchema = require('../../../../models/user/userSchema');

module.exports.checkResponse = (req, res) => {

    const {
        recipe_id,
        user_id
    } = req.body;

    return userSchema.findOne({ _id: user_id }).then(({ likedRecipes }) => {

        const isLiked = likedRecipes.includes(recipe_id);

        if (isLiked) {
            return res.send('true');
        }

        return res.send('false');

    }).catch(err => {
        console.log(err);

        return res.send(err);
    })

}
