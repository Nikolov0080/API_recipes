const recipeSchema = require('../../../../models/recipes/recipeSchema');

module.exports.deleteComment = (req, res) => {
    const [recipeId, commentId] = req.params.id.split("&&");

    recipeSchema.findOne(
        { _id: recipeId },
        (err, data) => {
            if (err) {
                console.log(err);
                return res.send('err');
            }

            const newComments = [...data.comments].reduce((acc, cVal) => {

                if (cVal._id.toString() !== commentId.toString()) {
                    acc.push(cVal);
                }
                
                return acc;
            }, []);

            recipeSchema.findByIdAndUpdate(
                { _id: recipeId },
                { comments: newComments },
                (err,data)=>{
                    console.log('updated')
                }
            )
        }
    )
    res.send('da');
}