const jwt = require('./jwt');


module.exports.authFooLogged = (req, res, next) => {

    const cookie = req.cookies['auth'];

    if (!cookie) {
        return res.redirect('/');
    }

    const decodedCookie = jwt.decodeToken(cookie);

    if (decodedCookie.secret !== process.env.JWT_SECRET) {
        return res.redirect('/');
    }

    console.log(decodedCookie);

    next();
}
//TODO finish function blow (implement guest user behaviors and rights...)
module.exports.authFooGuest = (req, res, next) => {

    const cookie = req.cookies['auth'];

    if (cookie) {
        return res.redirect('/')
    }

    next()
}