const { Item, Market, ItemMarket } = require('../models');
const { formatCurrency } = require('../helpers/numberToRupiah');
const { Op } = require('sequelize');
const fs = require('fs');

exports.findAll = async (req, res, next) => {
    try {
        let options = {
            include: [{
                model: Market,
                order: [
                    ["ItemMarket.updatedAt", "DESC"]
                ]
            }]
        }
        if (req.query.search) {
            options.where = {
                name: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            }
        }
        let markets = await Market.findAll();
        let items = await Item.findAll(options);
        // res.status(200).json(items);
        let item = false;
        if (items.length === 1) {
            item = items[0];
        }
        let isLogin = req.session.token ? true : false;
        res.render('Home', { items, formatCurrency, item, markets, isLogin });
    } catch (err) {
        next(err);
    }
}

exports.findAllForTable = async (req, res, next) => {
    try {
        let options = {
            include: [{
                model: Market,
                order: [
                    ["ItemMarket.updatedAt", "DESC"]
                ]
            }]
        }
        if (req.query.search) {
            options.where = {
                name: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            }
        }
        let items = await Item.findAll(options);
        // res.status(200).json(items);
        let message = req.query.message ? req.query.message : null;
        res.render('Item', { items, formatCurrency, message });
    } catch (err) {
        next(err);
    }
}

exports.getCreate = async(req, res, next) => {
    res.render('ItemForm', { error: null, item: null, action: 'Tambah' });
}

exports.create = async (req, res, next) => {
    try {
        let { name, unitName, market1, market2 } = req.body;
        let sampleFile;
        let uploadPath;
        let item;
        let imageUrl = req.protocol + '://' + req.get('host') + `/assets/item-images/default.jpg`;
        if (req.files && Object.keys(req.files).length !== 0) {
            sampleFile = req.files.file;
            imageUrl = req.protocol + '://' + req.get('host') + `/assets/item-images/`;
            item = await Item.create({ name, unitName, imageUrl });
            await item.set('imageUrl', imageUrl + item.id + "." + sampleFile.mimetype.split('/')[1]).save();
            uploadPath = process.cwd() + '/public/assets/item-images/' + item.id + "." + sampleFile.mimetype.split('/')[1];
            await sampleFile.mv(uploadPath);
        } else {
            item = await Item.create({ name, unitName, imageUrl });
        }
        if (item) {
            await ItemMarket.create({
                MarketId: 1,
                ItemId: item.id,
                price: market1 ? market1 : 0
            })
            await ItemMarket.create({
                MarketId: 2,
                ItemId: item.id,
                price: market2 ? market2 : 0
            })
        }
        res.redirect('/items?message=Sukses Menambahkan Data')
        // res.status(201).json({ message: 'Berhasil menambahkan data item' });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') return res.render('ItemForm', { error: err.errors[0].message, item: req.body, action: 'Tambah' });
        if (err.name === 'SequelizeUniqueConstraintError') return res.render('ItemForm', { error: 'Item sudah pernah terdaftar', item: req.body, action: 'Tambah' })
        next(err);
    }
}

exports.findById = async (req, res, next) => {
    try {
        let items = await Item.findAll({
            include: [{
                model: Market,
                order: [
                    ["ItemMarket.updatedAt", "DESC"]
                ]
            }]
        })
        let markets = await Market.findAll();
        let item = await Item.findByPk(req.params.id, {
            include: [{
                model: Market,
                order: [
                    ["ItemMarket.updatedAt", "DESC"]
                ]
            }]
        })
        let isLogin = req.session.token ? true : false;
        res.render('Home', { items, item, formatCurrency, markets, isLogin })
        // res.status(200).json(item);
    } catch (err) {
        next(err);
    }
}

exports.getUpdate = async (req, res, next) => {
    try {
        let item = await Item.findByPk(req.params.id, {
            include: [{
                model: Market,
                order: [
                    ["ItemMarket.updatedAt", "DESC"]
                ]
            }]
        })
        res.render('ItemForm', { item, error:null, action: 'Ubah Data' });
        // res.status(200).json(item);
    } catch (err) {
        next(err);
    }
}

exports.updateItem = async (req, res, next) => {
    try {
        let { name, unitName, market1, market2 } = req.body;
        let item = await Item.findByPk(req.params.id);
        if (!item) return next({ name: 'NOT_FOUND' });
        await Item.update({ name, unitName }, { where: { id: req.params.id } });
        if (req.files && Object.keys(req.files).length !== 0) {
            let sampleFile = req.files.file;
            let uploadPath = process.cwd() + '/public/assets/item-images/' + item.id + "." + sampleFile.mimetype.split('/')[1];
            await sampleFile.mv(uploadPath);
        }
        if (market1) {
            await ItemMarket.update({
                price: market1
            }, { where: { MarketId: 1, ItemId: item.id } });
        }
        if (market2) {
            await ItemMarket.update({
                price: market2
            }, { where: { MarketId: 2, ItemId: item.id } });
        }
        res.redirect('/items?message=Sukses Mengubah Data')
        // res.status(200).json({ message: 'Berhasil mengubah data item' });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') return res.render('ItemForm', { error: err.errors[0].message, item: req.body, action: 'Ubah Data' });
        if (err.name === 'SequelizeUniqueConstraintError') return res.render('ItemForm', { error: 'Item sudah pernah terdaftar', item: req.body, action: 'Ubah Data' })
        next(err);
    }
}

exports.destroy = async (req, res, next) => {
    try {
        let item = await Item.findOne({ where: { id: req.params.id } });
        if (!item) return next({ name: 'NOT_FOUND' });
        let format = item.imageUrl.split('.')[item.imageUrl.split('.').length - 1];
        let imgName = item.imageUrl.split('.')[0].split('/')[item.imageUrl.split('.')[0].split('/').length - 1];
        await Item.destroy({ where: { id: req.params.id } });
        const path = process.cwd() + '/public/assets/item-images/' + `${imgName}.${format}`;
        if (imgName !== 'default') {
            fs.unlink(path, (err) => {
                    if (err) {
                    next(err);
                    return
                    }
                    res.redirect('/items?message=Sukses Menghapus Data')
                })
        } else {
            res.redirect('/items?message=Sukses Menghapus Data')
        }
        // res.status(200).json({ message: 'Berhasil menghapus data item' });
    } catch (err) {
        next(err);
    }
}

exports.search = (req, res) => {
    if (req.body.name) {
        res.redirect(`/items?search=${req.body.name}`);
    } else {
        res.redirect('/items');
    }
}