const recipeSchema = require('../../models/recipes/recipeSchema');
const jwt = require('../../utils/jwt');
const multer = require('multer');
const upload = multer({
    dest: '/uploads/'
})
module.exports.createRecipe = (req, res, next) => {

    const creatorId = jwt.decodeToken(req.cookies['auth'])._id;

    const {
        // recipeName,
        // products,
        // prepTime,
        // cookTime,
        // directions,
        // difficulty,
        image1,
        image2
    } = req.body;

    console.log(req.body)

    // async function saveRecipe() {
    //     return await recipeSchema.create({
    //         recipeName,
    //         products,
    //         prepTime,
    //         cookTime,
    //         directions,
    //         difficulty,
    //         creatorId,
    //         // photos:[] TODO
    //     })
    // }

    // saveRecipe().then((response)=>{
    //     console.log(response)
    // })


    // console.log(creatorId);
    res.redirect('/recipes/create-recipe');
}