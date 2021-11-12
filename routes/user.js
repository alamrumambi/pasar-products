const router = require('express').Router();
const { register, login, getLogin, logout, getRegister, findAll, getUpdate, postUpdate, deleteUser, search } = require('../controllers/userCotroller');

router.get('/', findAll);
router.get('/register', getRegister);
router.post('/register', register);
router.get('/edit/:id', getUpdate);
router.post('/edit/:id', postUpdate);
router.get('/login', getLogin);
router.post('/login', login);
router.get('/delete/:id', deleteUser);
router.get('/logout', logout);
router.post('/search', search);

module.exports = router;