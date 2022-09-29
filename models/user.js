const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const LoginError = require('../utils/errors/loginerror');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: [true, 'Емайл не указан!'],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `'${props.value}' неверный емайл!`,
    },
  },
  password: {
    type: String,
    required: [true, 'Пароль не задан'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function a(email, password) {
  return this
    .findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new LoginError();
    })
    .then((user) => bcrypt
      .compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new LoginError();
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
