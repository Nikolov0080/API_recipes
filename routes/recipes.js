var express = require('express');
var router = express.Router();
const { createRecipe } = require('../controllers/recipes/createRecipe');
const { authFooLogged, authFooGuest } = require('../utils/authFoo');
const { getAllRecipesGet, getAllRecipesPost } = require('../controllers/recipes/getAllRecipes');
const { getRecipeDetails, postRecipeDetails } = require('../controllers/recipes/getRecipeDetails');
const { like } = require('../controllers/recipes/userActs/likes/like');
const { checkResponse } = require('../controllers/recipes/userActs/likes/checkResponse');
const { searchRecipe } = require('../controllers/recipes/searchRecipe');
const { getCategory } = require('../controllers/recipes/getCategory');
const { deleteRecipe } = require('../controllers/recipes/deleteRecipe');
const { addComment } = require('../controllers/recipes/userActs/comments/addComment');
const { deleteComment } = require('../controllers/recipes/userActs/comments/deleteComment');

router.get('/create-recipe', authFooLogged, (req, res) => {
    res.render('createRecipe')
}).post('/create-recipe', createRecipe);

router.get('/all-recipes', authFooLogged, getAllRecipesGet)
    .post('/all-recipes', getAllRecipesPost);

router.get('/recipe-details/:id', authFooGuest, getRecipeDetails)
    .post('/recipe-details', postRecipeDetails);

router.delete('/delete-recipe/:id', deleteRecipe);

router.delete('/delete-comment/:id', deleteComment);

router.post('/add-comment', addComment);

router.post('/get-category', getCategory);

router.post('/search-recipe', searchRecipe);

router.post('/like', like);

router.post('/check-likes', checkResponse);

module.exports = router;