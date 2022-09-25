const ApplicationError = require('./applicationerror');

class LoginError extends ApplicationError {
  constructor(message = 'Неверный логин или пароль') {
    super(401, message);
  }
}

module.exports = LoginError;
