var express = require('express');
var router = express.Router();
const { decodeToken } = require('../utils/jwt');

var user = ''
/* GET home page. */
router.get('/', function (req, res, next) {

  if (req.cookies['auth']) {
    console.log('da')
    const user = decodeToken(req.cookies['auth']).username;
    return res.render('home', { title: 'Express', username: user });

  }

  res.render('home', { title: 'Express' });


});

// TODO create recipe, redact recipe,delete recipe 

module.exports = router;