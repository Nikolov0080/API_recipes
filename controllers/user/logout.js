const { signedCookie } = require('cookie-parser');
const jwt = require('../../utils/jwt');

module.exports.logout = (req, res) => {

    res.clearCookie('auth')
    console.log("======cookie dead!======")

    res.send("logout")
}