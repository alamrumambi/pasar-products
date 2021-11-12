const router = require('express').Router();
const { findAll, findById } = require('../controllers/itemController');


router.use('/users', require('./user'));
router.post('/search', (req, res) => {
    if (req.body.name) {
        res.redirect(`/?search=${req.body.name}`);
    } else {
        res.redirect('/');
    }
})
router.use('/items', require('./item'));
router.get('/', findAll);
router.get('/:id', findById);

module.exports = router;