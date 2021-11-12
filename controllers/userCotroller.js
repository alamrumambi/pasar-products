const { User } = require('../models');
const { compare } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { Op } = require('sequelize');

exports.findAll = async(req, res, next) => {
    try {
        let options = {}
        if (req.query.search) {
            options.where = {
                [Op.or] : {
                    name: {
                        [Op.iLike]: `%${req.query.search}%`
                    },
                    email: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                }
            }
        }
        let message = req.query.message ? req.query.message : null;
        let users = await User.findAll(options);
        users.forEach((e) => {
            delete e.password;
        })
        res.render('User', { users, message });
    } catch(err) {
        next(err);
    }
}

exports.getRegister = (req, res, next) => {
    res.render('UserForm', { error: null, user: null, action: 'Tambah' });
}

exports.register = async(req, res, next) => {
    let { name, email, password } = req.body;
    try {
        console.log(req.body, '<<ini body');
        await User.create({ name, email, password });
        res.redirect('/users?message=Sukses Tambah Data');
        // res.status(201).json({ message: 'User baru berhasil ditambahkan' });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') return res.render('UserForm', { error: err.errors[0].message, user: req.body, action: 'Tambah' });
        if (err.name === 'SequelizeUniqueConstraintError') return res.render('UserForm', { error: 'Email sudah terdaftar', user: req.body, action: 'Tambah' })
        next(err);
    }
}

exports.getLogin = (req, res, next) => {
    res.render('Login', { error: null, user: null });
}

exports.login = async(req, res, next) => {
    try {
        let { email, password } = req.body;
        // if (!email || !password) return res.status(400).json({ message: 'Input tidak lengkap' });
        if (!email || !password) return res.render('Login', { error: 'Input tidak lengkap', user: req.body });
        let user = await User.findOne({ where: { email } });
        // if (!user || !compare(password, user.password)) return res.status(401).json({ message: 'Email atau password tidak sesuai' });
        if (!user || !compare(password, user.password)) return res.render('Login', { error: 'Email atau password tidak sesuai', user: req.body });
        let token = generateToken(user);
        req.session.token = token;
        // res.status(200).json(token);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
}

exports.getUpdate = async(req, res, next) => {
    try {
        let user = await User.findOne({ where: { id: req.params.id} });
        if (!user) return next({ name: 'NOT_FOUND' });
        res.render('UserForm', { error: null, user, action: 'Ubah Data' });
    } catch(err) {
        next(err);
    }
}

exports.postUpdate = async(req, res, next) => {
    let { name, email, password } = req.body;
    try {
        let user = await User.findOne({ where: { id: req.params.id} });
        if (!user) return next({ name: 'NOT_FOUND' });
        let input = { name, email };
        if (password) input.password = password;
        await User.update(input, {
            where: { id: req.params.id },
            individualHooks: true
        })
        res.redirect('/users?message=Sukses Ubah Data')
    } catch(err) {
        if (err.name === 'SequelizeValidationError') return res.render('UserForm', { error: err.errors[0].message, user: req.body, action: 'Ubah Data' });
        if (err.name === 'SequelizeUniqueConstraintError') return res.render('UserForm', { error: 'Email sudah terdaftar', user: req.body, action: 'Ubah Data' })
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        let user = await User.findOne({ where: { id: req.params.id} });
        if (!user) return next({ name: 'NOT_FOUND' });
        await User.destroy({ where: {id: req.params.id} });
        res.redirect('/users?message=Sukses Hapus Data');
    } catch(err) {
        next(err);
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
}

exports.search = (req, res) => {
    if (req.body.name) {
        res.redirect(`/users?search=${req.body.name}`);
    } else {
        res.redirect('/users');
    }
}