const jwt = require('./jwt');


module.exports.authFoo = (req, res, next) => {
    const isLogged = req.cookies['auth'];
    
    console.log(isLogged)
    next()
}