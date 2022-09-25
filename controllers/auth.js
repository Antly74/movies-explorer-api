const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ConflictError = require('../utils/errors/conflicterror');

const userModel = require('../models/user');
const ValidationError = require('../utils/errors/validationerror');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 1000 * 60 * 60 * 24 * 7 },
      );
      res
        .cookie('jwt', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: false,
        })
        .send({ message: 'Успешный вход' });
    })
    .catch((err) => {
      // очищаем куку при неудачном логине
      res.clearCookie('jwt');
      next(err); // пробрасываем ошибку дальше в центральный обработчик
    });
};

module.exports.logout = (req, res) => {
  // очищаем куку
  res
    .clearCookie('jwt')
    .send({ message: 'Разлогирован' });
};
