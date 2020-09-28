var express = require('express');
var router = express.Router();
const { decodeToken } = require('../utils/jwt');

/* GET home page. */
router.get('/', function (req, res, next) {

  const username = decodeToken(req.cookies['auth']).username;

  res.render('home', { title: 'Express', username });
});

// TODO create recipe, redact recipe,delete recipe 

module.exports = router;