const jwt = require('jsonwebtoken');

module.exports = {
    createToken: (data) => {
        return jwt.sign(data, 'auth');
    },
    decodeToken: (token) => {
        return jwt.decode(token);
    }
}