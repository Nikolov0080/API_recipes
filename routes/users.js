var express = require('express');
var router = express.Router();
const { loginPost, loginGet } = require('../controllers/user/login');
const { profileGet, profilePost } = require('../controllers/user/profile');
const { registerGet, registerPost } = require('../controllers/user/register');
const { logout } = require('../controllers/user/logout');
const { authFooLogged, authFooGuest } = require('../utils/authFoo');
const { login } = require('../validations/user');

router.get('/login', authFooGuest, loginGet)
  .post('/login', login, loginPost);

router.get('/register', authFooGuest, registerGet)
  .post('/register', registerPost);

router.get('/profile/:username', authFooLogged, profileGet)
  .post('/profile/:username', profilePost);

router.get('/logout', logout);



module.exports = router;