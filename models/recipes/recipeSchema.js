const mongoose = require('mongoose');
const { Schema } = mongoose;
const Model = mongoose.model;

const recipeSchema = new Schema({

    recipeName: {
        type: String,
        require: true
    },

    ingredients: {
        type: String,
        require: true
    },
    prepTime: {
        type: String,
        require: true
    },
    cookTime: {
        require: true,
        type: String,
    },
    directions: {
        type: String,
        require: true
    },
    difficulty: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {

    },

    likes: [{ type: "ObjectId", ref: "User" }],
    creatorId: { type: "ObjectId", ref: "User" },
    comments: []
});

module.exports = new Model('Recipes', recipeSchema);