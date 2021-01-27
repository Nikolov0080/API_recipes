const userSchema = require('../../models/user/userSchema');

module.exports.likedRecipes = (req, res) => {

    const userId = req.params.userId;

    return userSchema.findOne({ _id: userId })
        .populate('likedRecipes')
        .exec((err, data) => {
            if (err) {
                console.log(err);
                return res.status(203).send('error')
            } else {
               return res.send(data.likedRecipes);
            }

        })
}