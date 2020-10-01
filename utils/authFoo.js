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

    next();
}
module.exports.authFooGuest = (req, res, next) => {

    const cookie = req.cookies['auth'];

    if (cookie) {
        return res.redirect('/')
    }

    const decodedCookie = jwt.decodeToken(cookie);

    if (decodedCookie) {

        if (decodedCookie.secret !== process.env.JWT_SECRET) {
            return res.redirect('/');
        }

    }
    next()
}