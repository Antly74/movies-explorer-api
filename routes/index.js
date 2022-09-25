const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/auth');
const NotFoundError = require('../utils/errors/notfounderror');
const { validateSignIn, validateSignUp } = require('../middlewares/validators');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);

router.post('/signout', auth, logout);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
});

module.exports = router;
