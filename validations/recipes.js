const validator = require('validator').default;
const recipeSchema = require('../models/recipes/recipeSchema');

exports.recipesValidations = (recipe) => {

    if (validator.isEmpty(recipe.recipeName, { ignore_whitespace: false })) {
        return 'fill recipe name'
    }

    if (validator.isEmpty(recipe.products, { ignore_whitespace: false })) {
        return 'fill products'
    }

    if (validator.isEmpty(recipe.prepTime, { ignore_whitespace: false })) {
        return 'fill prep time'
    }

    if (validator.isEmpty(recipe.cookTime, { ignore_whitespace: false })) {
        return 'fill cook time'
    }

    if (validator.isEmpty(recipe.directions, { ignore_whitespace: false })) {
        return 'fill directions'
    }

    if (validator.isEmpty(recipe.difficulty, { ignore_whitespace: false })) {
        return 'fill difficulty'
    }

    if (validator.isEmpty(recipe.category, { ignore_whitespace: false })) {
        return 'fill category'
    }

    return false;
}

