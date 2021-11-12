const { User } = require('../models');
const { compare } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

exports.register = async(req, res, next) => {
    try {
        let { name, email, password } = req.body;
        await User.create({ name, email, password });
        res.status(201).json({ message: 'User baru berhasil ditambahkan' });
    } catch(err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        let {email, password} = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Input tidak lengkap' });
        let user = await User.findOne({ where: {email} });
        if (!user || !compare(password, user.password)) return res.status(401).json({ message: 'Email atau password tidak sesuai' });
        let token = generateToken(user);
        res.status(200).json(token);
    } catch(err) {
        next(err);
    }
}