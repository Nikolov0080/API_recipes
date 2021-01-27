var express = require('express');
var router = express.Router();

const { loginPost, loginGet } = require('../controllers/user/login');
const { profileGet, profilePost } = require('../controllers/user/profile');
const { registerGet, registerPost } = require('../controllers/user/register');
const { logout } = require('../controllers/user/logout');
const { authFooLogged, authFooGuest } = require('../utils/authFoo');
const { likedRecipes } = require('../controllers/user/likedRecipes');

router.get('/login', authFooGuest, loginGet)
  .post('/login',  loginPost);

router.get('/register', authFooGuest, registerGet)
  .post('/register', registerPost);

router.get('/profile', authFooLogged, profileGet)
  .post('/profile', profilePost);

  router.get('/liked-recipes/:userId',likedRecipes)

router.get('/logout', logout);

module.exports = router;