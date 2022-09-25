const ApplicationError = require('./applicationerror');

class ConflictError extends ApplicationError {
  constructor(message = 'Ошибка уникальности данных') {
    super(409, message);
  }
}

module.exports = ConflictError;
