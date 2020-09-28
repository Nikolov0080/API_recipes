var express = require('express');
var router = express.Router();

router.get('/create-recipe', (req, res) => {
    res.render('createRecipe')
}).post('/create-recipe', (req, res) => {
    console.log(req.body)
    res.redirect('/recipes/create-recipe');
})

module.exports = router;