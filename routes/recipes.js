var express = require('express');
var router = express.Router();
const { createRecipe,createRecipeImages } = require('../controllers/recipes/createRecipe');
const { authFooLogged } = require('../utils/authFoo');
const { upload } = require('../utils/multerConf');

router.get('/create-recipe', authFooLogged, (req, res) => {
    res.render('createRecipe')
}).post('/create-recipe', createRecipe);

router.get('/create-recipe/images', authFooLogged, (req, res) => {
    res.render('createRecipeImages')
}).post('/create-recipe/images', upload.single('image2'), createRecipeImages);

module.exports = router;