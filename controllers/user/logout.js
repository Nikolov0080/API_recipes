const { signedCookie } = require('cookie-parser');
const jwt = require('../../utils/jwt');

module.exports.logout = (req, res) => {

    console.log(req.cookies)

    res.send("logout")
}