const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashing = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

exports.compare = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}