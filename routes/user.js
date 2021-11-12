const router = require('express').Router();
const { register, login, getLogin, logout, getRegister, findAll, getUpdate, postUpdate, deleteUser, search } = require('../controllers/userCotroller');
const { authentication } = require('../middlewares/auth');

router.get('/login', getLogin);
router.post('/login', login);
router.use(authentication);
router.get('/', findAll);
router.get('/register', getRegister);
router.post('/register', register);
router.get('/edit/:id', getUpdate);
router.post('/edit/:id', postUpdate);
router.get('/delete/:id', deleteUser);
router.post('/search', search);
router.get('/logout', logout);

module.exports = router;