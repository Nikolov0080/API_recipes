const mongoose = require('mongoose');
const { Schema } = mongoose;
const Model = mongoose.model;
const bcrypt = require('bcrypt');

const saltRounds = 6;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    skillLevel: {
        type: String,
        required: true
    },
    // profilePicture:{
    //     type:Ima
    // },

    favorites: [{ // type: mongoose.Schema.Types.ObjectId
        type: "ObjectId",
        ref: "Recipes"
    }],
    likedRecipes: [{
        type: "ObjectId",
        ref: "Recipes"
    }],
    userRecipes: [{
        type: "ObjectId",
        ref: "Recipes"
    }],
    favorites: [{
        type: "ObjectId",
        ref: "Recipes"
    }]

});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
})

module.exports = new Model('User', userSchema);