const userModel = require('../models/user');
const NotFoundError = require('../utils/errors/notfounderror');
const ValidationError = require('../utils/errors/validationerror');
const ConflictError = require('../utils/errors/conflicterror');

module.exports.getUsersMe = (req, res, next) => {
  const { _id: id } = req.user;
  userModel
    .findById(id)
    .orFail(() => {
      throw new NotFoundError(`Пользователь с id=${id} не найден`);
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.patchUserMe = (req, res, next) => {
  const { name, email } = req.body;

  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      throw new NotFoundError(`Пользователь с id=${req.user._id} не найден`);
    })
    .then((user) => res.send(user))
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
