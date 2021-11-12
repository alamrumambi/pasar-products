const router = require('express').Router();
const { findAllForTable, getCreate, create, getUpdate, updateItem, destroy, search } = require('../controllers/itemController');
const { authentication } = require('../middlewares/auth');


router.use(authentication);
router.get('/', findAllForTable);
router.get('/add', getCreate);
router.post('/add', create);
router.get('/edit/:id', getUpdate);
router.post('/edit/:id', updateItem);
router.get('/delete/:id', destroy);
router.post('/search', search);

module.exports = router;