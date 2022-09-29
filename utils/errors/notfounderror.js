const ApplicationError = require('./applicationerror');

class NotFoundError extends ApplicationError {
  constructor(message = 'Поиск по ID не дал результатов') {
    super(404, message);
  }
}

module.exports = NotFoundError;
