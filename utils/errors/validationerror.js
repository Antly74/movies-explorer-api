const ApplicationError = require('./applicationerror');

class ValidationError extends ApplicationError {
  constructor(message = 'Ошибка валидации данных') {
    super(400, message);
  }
}

module.exports = ValidationError;
