var express = require('express');
var router = express.Router();
const { loginPost, loginGet } = require('../controllers/user/login');
const { profileGet, profilePost } = require('../controllers/user/profile');
const { registerGet, registerPost } = require('../controllers/user/register');
const { logout } = require('../controllers/user/logout');
const {authFoo} = require('../utils/authFoo');

router.get('/login',authFoo, loginGet)
  .post('/login', loginPost);

router.get('/register', registerGet)
  .post('/register', registerPost);

router.get('/profile/:username', profileGet)
  .post('/profile/:username', profilePost);

router.get('/logout', logout);
module.exports = router;