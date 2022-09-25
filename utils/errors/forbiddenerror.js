const ApplicationError = require('./applicationerror');

class ForbiddenError extends ApplicationError {
  constructor(message = 'Вы не можете удалить чужой фильм') {
    super(403, message);
  }
}

module.exports = ForbiddenError;
