const { Item, Market, ItemMarket } = require('../models');
const { formatCurrency } = require('../helpers/numberToRupiah');
const { Op } = require('sequelize');

exports.findAll = async(req, res, next) => {
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
                    [Op.iLike]: req.query.search
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
        res.render('Home', { items, formatCurrency, item, markets });
    } catch (err) {
        next(err);
    }
}

exports.create = async(req, res, next) => {
    try {
        let { name, unitName, Markets } = req.body;
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
            for (let e of Markets) {
                await ItemMarket.create({
                    MarketId: e.MarketId,
                    ItemId: item.id,
                    price: e.price
                })
            }
        }
        res.status(201).json({ message: 'Berhasil menambahkan data item' });
    } catch (err) {
        next(err);
    }
}

exports.findById = async(req, res, next) => {
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
        res.render('Home', { items, item, formatCurrency, markets })
            // res.status(200).json(item);
    } catch (err) {
        next(err);
    }
}

exports.updateItem = async(req, res, next) => {
    try {
        let { name, unitName, Markets } = req.body;
        let item = await Item.findByPk(req.params.id);
        if (!item) return res.status(400).json({ message: 'Item tidka ditemukan' });
        await Item.update({ name, unitName }, { where: { id: req.params.id } });
        if (req.files && Object.keys(req.files).length !== 0) {
            let sampleFile = req.files.file;
            let uploadPath = process.cwd() + '/public/assets/item-images/' + item.id + "." + sampleFile.mimetype.split('/')[1];
            await sampleFile.mv(uploadPath);
        }
        for (let e of Markets) {
            await ItemMarket.update({
                price: e.price
            }, { where: { MarketId: e.MarketId, ItemId: item.id } });
        }
        res.status(200).json({ message: 'Berhasil mengubah data item' });
    } catch (err) {
        next(err);
    }
}

exports.destroy = async(req, res, next) => {
    try {
        let item = await Item.findOne({ where: { id: req.params.id } });
        if (!item) return res.status(404).json({ message: 'Item tidak ditemukan' });
        await Item.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: 'Berhasil menghapus data item' });
    } catch (err) {
        next(err);
    }
}