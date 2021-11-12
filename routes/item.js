const router = require('express').Router();
const { findAll, create, findById, updateItem, destroy } = require('../controllers/itemController');
const { authentication } = require('../middlewares/auth');

router.get('/', findAll);
router.get('/:id', findById);
router.use(authentication);
router.post('/', create);
router.put('/:id', updateItem);
router.delete('/:id', destroy);

module.exports = router;