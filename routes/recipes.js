var express = require('express');
var router = express.Router();

router.get('/create-recipe',(req,res)=>{
    res.render('createRecipe')
})

module.exports = router;