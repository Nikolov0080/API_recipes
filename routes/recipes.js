var express = require('express');
var router = express.Router();
const { createRecipe } = require('../controllers/recipes/createRecipe');
const { authFooLogged } = require('../utils/authFoo');
const { getAllRecipesGet,getAllRecipesPost } = require('../controllers/recipes/getAllRecipes');
const {getRecipeDetails, postRecipeDetails}  =  require('../controllers/recipes/getRecipeDetails');

router.get('/create-recipe', authFooLogged, (req, res) => {
    res.render('createRecipe')
}).post('/create-recipe', createRecipe);

router.get('/all-recipes', authFooLogged, getAllRecipesGet)
.post('/all-recipes', getAllRecipesPost);


router.get('/recipe-details', authFooLogged, getRecipeDetails)
.post('/recipe-details', postRecipeDetails);

module.exports = router;