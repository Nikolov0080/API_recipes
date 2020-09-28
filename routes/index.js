var express = require('express');
var router = express.Router();
const { decodeToken } = require('../utils/jwt');


/* GET home page. */
router.get('/', function (req, res, next) {
  var user = '';

  if (req.cookies['auth']) {
    console.log('da')
    user = decodeToken(req.cookies['auth']).username;
    return res.render('home', { title: 'Express', username: user });

  }

  res.render('home', { title: 'Express', username: "GUEST" });

});

module.exports = router;