const router = require('express').Router();

router.use('/users', require('./user'));
router.post('/search', (req, res) => {
    if (req.body.name) {
        res.redirect(`/?search=${req.body.name}`);
    } else {
        res.redirect('/');
    }
})
router.use('/', require('./item'));

module.exports = router;