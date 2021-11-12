const { verify } = require('../helpers/jwt');

exports.authentication = (req, res, next) => {
    if (!req.session.token) return res.redirect('/users/login')
    // if (!req.headers.token) return res.status(401).json({ message: 'Silahkan login terlebih dahulu' });
    req.userData = verify(req.session.token);
    next();
}