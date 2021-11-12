var jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, name:user.name }, 'halo ini jwt saja');
}

exports.verify = (token) => {
    return jwt.verify(token, 'halo ini jwt saja');
}