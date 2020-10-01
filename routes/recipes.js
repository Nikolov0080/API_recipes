var express = require('express');
var router = express.Router();
const { createRecipe,createRecipeImages } = require('../controllers/recipes/createRecipe');
const { authFooLogged } = require('../utils/authFoo');

router.get('/create-recipe', authFooLogged, (req, res) => {
    res.render('createRecipe')
}).post('/create-recipe', createRecipe);

module.exports = router;