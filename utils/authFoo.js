const jwt = require('./jwt');


module.exports.authFooLogged = (req, res, next) => {

    const cookie = req.cookies['auth'];

    if (!cookie) {
        return res.send('UNAUTHORIZED');

    }

    const decodedCookie = jwt.decodeToken(cookie);

    if (decodedCookie.secret !== process.env.JWT_SECRET) {
        return res.send('UNAUTHORIZED');

    }

    next();
}
module.exports.authFooGuest = (req, res, next) => {

    const cookie = req.cookies['auth'];

    if (cookie) {
        return res.send('UNAUTHORIZED');

    }

    const decodedCookie = jwt.decodeToken(cookie);

    if (decodedCookie) {

        if (decodedCookie.secret !== process.env.JWT_SECRET) {
            return res.send('UNAUTHORIZED');
        }

    }
    next()
}